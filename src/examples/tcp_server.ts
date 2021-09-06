/**
This is a completely open server that can be run for testing purposes. 
It will log out all incoming data and connections sent to the server and sends
a generic http message in response
*/

import * as net from 'net';
import config from '../server/config';
const server = net.createServer();

const args = process.argv.slice(2);

const [userPort] = args;

const PORT = userPort || config.defaultPort;

// server listening for connection event
server.on('connection', handleConnection);
// server listening for connections on port 3000
server.listen(PORT);
console.log(`listening on port ${PORT}`);
function handleConnection(socket: net.Socket) {
  console.log('connected');

  socket.once('readable', () => {
    let reqBuffer = Buffer.from('');
    let buf;
    let reqHeader;

    while (true) {
      buf = socket.read();
      // Stop if there's no more data
      if (buf === null) break;
      reqBuffer = Buffer.concat([reqBuffer, buf]);

      const marker = reqBuffer.indexOf('\r\n\r\n');

      if (marker !== -1) {
        const remaining = reqBuffer.slice(marker + 4);
        reqHeader = reqBuffer.slice(0, marker).toString();
        socket.unshift(remaining);
        break;
      }
    }
    console.log(`Request header:\n${reqHeader}`);

    reqBuffer = Buffer.from('');
    while ((buf = socket.read()) !== null) {
      reqBuffer = Buffer.concat([reqBuffer, buf]);
    }

    const reqBody = reqBuffer.toString();
    console.log(`Request body:\n${reqBody}`);

    // Send a generic response
    socket.end(
      'HTTP/1.1 200 OK\r\nServer: my-custom-server\r\nContent-Length: 0\r\n\r\n',
    );
  });
}

// https://www.codementor.io/@ziad-saab/let-s-code-a-web-server-from-scratch-with-nodejs-streams-h4uc9utji
