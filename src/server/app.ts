import * as net from 'net';
const server = net.createServer();

// server listening for connection event
server.on('connection', handleConnection);
// server listening for connections on port 3000
server.listen(3000);
console.log('listening on port 3000');
function handleConnection(socket: net.Socket) {
  socket.on('data', (chunk) => {
    console.log('Received chunk:\n', chunk.toString());
  });
  socket.write(
    'HTTP/1.1 200 OK\r\nServer: my-web-server\r\nContent-Length: 0\r\n\r\n',
  );
}

// https://www.codementor.io/@ziad-saab/let-s-code-a-web-server-from-scratch-with-nodejs-streams-h4uc9utji
