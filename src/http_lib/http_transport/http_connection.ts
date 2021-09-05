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

const handleSocketData = (socket) => {
  const { onSocketData } = getSocketEventFuncs(socket);
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
    if (body) {
      res.data = JSON.parse(body);
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
