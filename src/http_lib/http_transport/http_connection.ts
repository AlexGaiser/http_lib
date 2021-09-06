import { Socket, SocketConnectOpts } from 'net';
import { HTTPConfig } from '../http_client/types';
import contentTypeParser from 'content-type-parser';

import {
  buildRawHTTPRequest,
  getHeaderAndBodyString,
  getHeadersFromString,
} from '../http_parser/http_parser';
import {
  createSocketConnection,
  getSocketEventFuncs,
  writeToSocket,
} from './socket.service';

export const createHTTPConnection = (httpConfig: {
  host: string;
  port: number;
}): Socket => {
  const { host, port } = httpConfig;
  const socket = createSocketConnection({ host, port });

  return socket;
};

export function dispatchHTTPRequest(httpConfig) {
  const conn = createHTTPConnection(httpConfig);
  const { onSocketClose, onSocketData, endConnection } =
    getSocketEventFuncs(conn);
  let res: any = {};
  const write = writeToSocket(conn);

  const message = buildRawHTTPRequest(httpConfig);
  write(message);

  // will eventually need to be able to handle chunked/multipart data
  onSocketData((data) => {
    // this implementation is for unchunkedData
    const [headerString, body] = getHeaderAndBodyString(
      data.toString(),
    );
    if (headerString && !res.headers) {
      const headersObj = getHeadersFromString(headerString);
      res = {
        ...headersObj,
        contentLength: headersObj.headers['Content-Length'],
      };
    }
    if (res.headers && body) {
      const contentType = res.headers['Content-Type'];
      res.data = handleContentType(contentType, body);

      if (body.length === res.contentLength) {
        endConnection();
      }
    }
  });
  const promise = new Promise((resolve) =>
    onSocketClose(() => resolve(res)),
  );
  return promise;
}

// in the future this will be replaced by a more data agnostic method
const contentHandlers = {
  'application/json': handleJSON,
  'text/html': handleHTML,
};

function handleContentType(type: string, data: string) {
  const [mimeType, options] = parseContentType(type);
  console.log(mimeType);
  const handlerFunc = contentHandlers[mimeType];
  if (handlerFunc) return handlerFunc(data);
  else {
    return data;
  }
}

function handleJSON(data: string) {
  return JSON.parse(data);
}

function parseContentType(type: string) {
  const ctObj = contentTypeParser(type);
  const mimeType = [ctObj.type, ctObj.subtype].join('/');

  return [mimeType];
}

function handleHTML(data: string) {
  return data;
}
