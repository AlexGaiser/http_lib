import { RequestConfig, Method } from '../http_client/types';
import { CRLF } from '../constants';
import { URL } from 'url';

export type RawHTTPOptions = {
  host: string;
  path: string;
  port?: string;
  method: Method;
};

export const buildRawHTTPHeaders = (config: RequestConfig) => {
  const { headers } = config;

  const headersArr = [];
  const httpOptions = getRawHTTPOptions(config);
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

function getRawHTTPOptions(config: RequestConfig): RawHTTPOptions {
  const url = new URL(config.url);
  url;
  const options = {
    host: url.hostname,
    path: `${url.pathname || ''}${url.search || ''}`,
    method: config.method,
  };
  return options;
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
