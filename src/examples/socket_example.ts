import net from 'net';

/**
This is a basic example of the minimum requirements for sending an http request in node.
First you establish a socket connection. Then you add handlers for events on that socket
Then you can write a string formatted to the HTTP protocal specifications. 

If you are able to send it to the server, the response will fire the 'data' event.

http module in js uses ClientRequest class to send requests
it uses the net Module and Socket class to create the connection

To make an http request we need to do the following:
*/
// create connection (at minimum need host and port. http default port is 80)
const socket = net.createConnection({
  port: 3002,
  host: 'localhost',
});

// handle data coming back from server
socket.on('data', (data) => {
  console.log('data', data.toString());
});

socket.on('connect', (a) => {
  // wait for connection then can write to socket
  console.log('connected');
  // http message needs to be formatted to http protocol, with \r\n chars separating lines
  socket.write(
    `GET /test HTTP/1.1\r\nHost: localhost\r\nAccept: application/json\r\nContent-Type: application/json\r\nContent-Length: 28\r\nAccept-Encoding: gzip, deflate, br\r\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:58.0)\r\n\r\n{"text":"this is a comment"}`,
  );
});
