import { Socket, SocketConnectOpts } from 'net';
import { createSocketConnection } from '../socket.service';

describe('Testing Socket Service', () => {
  const socket = createSocketConnection({
    host: 'localhost',
    port: 3002,
  });

  it('tests creation of a socket class', () => {
    expect(socket).toBeInstanceOf(Socket);
  });
});
