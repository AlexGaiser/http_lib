import { getHTTPConfig } from '../http_parser/http_parser';
import { dispatchHTTPRequest } from '../http_transport/http_connection';
import { RequestConfig } from './types';

export const request = async (config: RequestConfig) => {
  const httpConfig = getHTTPConfig(config);
  const res = dispatchHTTPRequest(httpConfig);
  return res;
};
