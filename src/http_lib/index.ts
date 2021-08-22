import http from 'http';
import net from 'net';

/**
 http module in js uses ClientRequest class to send requests
 it uses a streaming api 
*/

const socket = net.createConnection({
  port: 3002,
  host: 'localhost',
});
socket.on('connect', (a) => {
  console.log(a);
});
socket.write('GET http://127.0.0.1:8080/ HTTP');
// http.get('http://localhost:3001/test');
