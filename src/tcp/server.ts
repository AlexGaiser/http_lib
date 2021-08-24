import net from 'net';

const server = net.createServer((connection) => {
  console.log('new connection');

  connection.on('data', (data) => {
    console.log(data.toString()); // prints the data
  });
});

server.listen(3002, () => {
  console.log('waiting for connection');
});
