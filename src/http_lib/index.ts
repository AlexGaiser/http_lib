// import http from 'http';
import { request } from './http_client/http_client';
import { RequestConfig } from './http_client/types';

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
    'Accept-Encoding': 'gzip, deflate, br',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:58.0)',
  },
  data: { text: 'this is a comment  next' },
};
const req = request(config).then((data) => console.log(data));
