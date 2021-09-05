import { ConnectOpts, Socket } from 'net';
import { SocketConnectOpts } from 'node:net';

export const createSocketConnection = (
  options: SocketConnectOpts,
): Socket => {
  const socket = new Socket().connect(options);

  return socket;
};

export const writeToSocket = (socket: Socket) => (data: string) => {
  socket.write(data);
};

export const handleSocketEvent =
  (event: string) => (socket: Socket) => (listener: any) => {
    return socket.on(event, listener);
  };

export const endSocketConnection = (socket: Socket) => {
  return socket.end();
};

export const handleSocketClose = handleSocketEvent('close');
export const handleSocketData = handleSocketEvent('data');

export const getSocketEventFuncs = (socket: Socket) => {
  return {
    onSocketClose: handleSocketClose(socket),
    onSocketData: handleSocketData(socket),
    endSocketConnection: endSocketConnection(socket),
  };
};
