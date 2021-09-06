// import http from 'http';
import { request } from './http_client/http_client';
import { RequestConfig } from './http_client/types';

const config: RequestConfig = {
  url: 'http://jsonplaceholder.typicode.com/posts/1',
  method: 'GET',
  params: {
    num: 10,
    str: 'test-string',
    bool: true,
  },
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip, deflate, br',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:58.0)',
  },
  // data: { text: 'this is a comment  next' },
};
const req = request(config).then((data) => console.log(data));
