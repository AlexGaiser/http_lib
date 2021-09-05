import {
  RequestConfig,
  Method,
  HTTPConfig,
} from '../http_client/types';
import { CRLF } from '../constants';
import {
  getHostFromURL,
  getPathFromURL,
  getPortFromURL,
  makeUrlString,
} from './url.service';

export const getHTTPConfig = (config: RequestConfig): HTTPConfig => {
  const { headers, data, url, method } = config;
  const fullURL = makeUrlString(config);
  const host = getHostFromURL(url);
  const port = getPortFromURL(url) || 80;
  const path = getPathFromURL(url);
  const httpConfig: HTTPConfig = {
    headers,
    data,
    host,
    port,
    path,
    url: fullURL,
    method,
  };
  return httpConfig;
};

export const buildRawHTTPHeaders = (config: HTTPConfig) => {
  const { headers } = config;

  const headersArr = [];
  const httpOptions = config;
  const startLine = makeStartLine(httpOptions);

  headersArr.push(startLine);
  Object.keys(headers).forEach((key) => {
    const header = makeHeaderString(key, headers[key]);
    headersArr.push(header);
  });
  return headersArr.join(CRLF);
};

function makeHeaderString(header: string, value: string | number) {
  return `${header}: ${value}`;
}

function makeRequestBody(config: HTTPConfig) {
  return JSON.stringify(config.data);
}

// tightly coupled, should have another layer in case we want to change Request config
// violation of SSR, responsible for building request && making body
export function buildRawHTTPRequest(config: HTTPConfig): string {
  const rawHeaders = buildRawHTTPHeaders(config);
  const data = makeRequestBody(config);

  return `${rawHeaders}${CRLF}${CRLF}${data}`;
}

function makeStartLine({
  method,
  path,
}: {
  method: Method;
  path: string;
}) {
  return `${method} ${path} HTTP/1.1`;
}
