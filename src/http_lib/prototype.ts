import http from 'http';
import net from 'net';

/**
 http module in js uses ClientRequest class to send requests
 it uses the net Module and Socket class to create the connection
 To make an http request we need to do the following:


*/

const socket = net.createConnection({
  port: 3002,
  host: 'localhost',
});
socket.on('data', (data) => {
  console.log('data', data.toString());
});

socket.on('connect', (a) => {
  console.log('connected');
  socket.write(
    `GET /test HTTP/1.1\r\nHost: localhost\r\nAccept: application/json\r\nContent-Type: application/json\r\nContent-Length: 28\r\nAccept-Encoding: gzip, deflate, br\r\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:58.0)\r\n\r\n{"text":"this is a comment"}`,
  );
});
// socket.destroy();

http.get('http://localhost:3002/test');
// const req = http.request('http://localhost:3002/test');

// console.log(req.getHeader('User-Agent'));
