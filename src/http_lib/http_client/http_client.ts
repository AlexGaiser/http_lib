import {
  buildRawHTTPRequest,
  getHTTPConfig,
} from '../http_parser/http_parser';
import {
  createHTTPConnection,
  dispatchHTTPRequest,
} from '../http_transport/http_connection';
import { writeToSocket } from '../http_transport/socket.service';
import { RequestConfig } from './types';

export const request = async (config: RequestConfig) => {
  const httpConfig = getHTTPConfig(config);
  // const conn = createHTTPConnection(httpConfig);
  // const RawHTTPRequestString = buildRawHTTPRequest(httpConfig);
  // const write = writeToSocket(conn);
  const res = await dispatchHTTPRequest(httpConfig);
  // write(RawHTTPRequestString);
  console.log(res);
  return res;
};
