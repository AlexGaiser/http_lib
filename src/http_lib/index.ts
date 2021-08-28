import { RequestConfig } from './http_client/types';
import {
  buildRawHTTPHeaders,
  buildRawHTTPRequest,
} from './http_parser/http_parser';
import {
  createSocketConnection,
  writeToSocket,
} from './socket.service';

const socket = createSocketConnection({
  host: 'localhost',
  port: 3002,
});

socket.on('close', () => {
  console.log('closing');
});
const write = writeToSocket(socket);
const config: RequestConfig = {
  url: 'http://localhost:3002/test',
  method: 'POST',
  params: {
    num: 10,
    str: 'test-string',
    bool: true,
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Host: 'localhost',
    'Content-Length': 28,
    'Accept-Encoding': 'gzip, deflate, br',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:58.0)',
  },
  data: { text: 'this is a comment' },
};
const data_old = `GET /test HTTP/1.1\r\nHost: localhost\r\nAccept: application/json\r\nContent-Type: application/json\r\nContent-Length: 28\r\nAccept-Encoding: gzip, deflate, br\r\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:58.0)\r\n\r\n{"text":"this is a comment"}`;
const data = buildRawHTTPRequest(config);
// buildRawHTTPHeaders(config) +
// '\r\n\r\n{"text":"this is a comment"}';

write(data);
