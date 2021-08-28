import { RequestConfig, Method } from '../http_client/types';
import { CRLF } from '../constants';
import { URL } from 'url';
import { makeUrlString } from './url.service';

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

function makeRequestBody(requestData: any) {
  return JSON.stringify(requestData);
}

function getRawHTTPOptions(config: RequestConfig): RawHTTPOptions {
  const url = makeUrlString(config);

  const urlObj = new URL(url);
  const options = {
    host: urlObj.hostname,
    path: `${urlObj.pathname || ''}${urlObj.search || ''}`,
    method: config.method,
  };

  return options;
}

export function buildRawHTTPRequest(config: RequestConfig): string {
  const rawHeaders = buildRawHTTPHeaders(config);
  const data = makeRequestBody(config.data);

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
