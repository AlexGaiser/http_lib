import { ConnectOpts, Socket } from 'net';
import { SocketConnectOpts } from 'node:net';

export const createSocketConnection = (
  options: SocketConnectOpts,
): Socket => {
  const socket = new Socket().connect(options);

  socket.on('data', (data) => {
    console.log(data.toString());
  });

  socket.on('connect', () => {
    console.log('connected');
  });

  return socket;
};

export const writeToSocket = (socket: Socket) => (data: string) => {
  socket.write(data);
};
