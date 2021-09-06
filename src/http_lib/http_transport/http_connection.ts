import { RSA_NO_PADDING } from 'constants';
import { Socket, SocketConnectOpts } from 'net';
import { json } from 'stream/consumers';
import { HTTPConfig } from '../http_client/types';
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

  onSocketData((data) => {
    console.log(data.toString());
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
      if (contentType === 'application/json') {
        res.data = JSON.parse(body);
      } else if (contentType === 'text/html; charset=UTF-8') {
        res.data = body;
      }
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
