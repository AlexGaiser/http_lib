import { Socket, SocketConnectOpts } from 'net';
import { HTTPConfig } from '../http_client/types';
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

  const { onSocketClose, onSocketData } = getSocketEventFuncs(socket);
  onSocketClose(() => console.log('closing'));
  onSocketData((data) => console.log('data', data.toString()));
  return socket;
};
