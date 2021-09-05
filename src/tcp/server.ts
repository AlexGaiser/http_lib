import net from 'net';

// this is essentially the lowest level server possible in node.
// created so we can see all data coming in to our socket

const server = net.createServer((connection) => {
  console.log('new connection');

  connection.on('data', (data) => {
    console.log(data.toString()); // prints the data
  });
});

server.listen(3002, () => {
  console.log('waiting for connection');
});
