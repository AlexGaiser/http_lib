import {
  buildRawHTTPRequest,
  getHTTPConfig,
} from '../http_parser/http_parser';
import { createHTTPConnection } from '../http_transport/http_connection';
import { writeToSocket } from '../http_transport/socket.service';
import { RequestConfig } from './types';

export const request = (config: RequestConfig) => {
  const httpConfig = getHTTPConfig(config);
  const conn = createHTTPConnection(httpConfig);
  const RawHTTPRequestString = buildRawHTTPRequest(httpConfig);
  const write = writeToSocket(conn);
  write(RawHTTPRequestString);
  return conn;
};
