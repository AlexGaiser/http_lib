import { Socket } from 'dgram';
import { createHTTPConnection } from '../http_connection';
import { endSocketConnection } from '../socket.service';

describe('Integration Test HTTP connection', () => {
  it('should test ability to create http connection', () => {
    const conn = createHTTPConnection({
      host: 'localhost',
      port: 3002,
    });
    expect(conn).toBeInstanceOf(Socket);
    endSocketConnection(conn);
  });
});
