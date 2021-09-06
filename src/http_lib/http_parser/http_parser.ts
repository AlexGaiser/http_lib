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

export function parseResStartline(startLine: string) {
  const [protocol, status, message] = startLine.split(' ');
  return {
    protocol: protocol.trim(),
    status: parseInt(status.trim()),
    message: message.trim(),
  };
}

export function getHeaderAndBodyString(str: string): string[] {
  return str.split(CRLF + CRLF);
}

export function parseHeaderString(str: string) {
  const headersArr = str.split(CRLF);
  const startLine = headersArr[0];
  const headers = makeHeaderObject(headersArr.slice(1));
  headers['Content-Length'] = parseInt(headers['Content-Length']);
  return {
    ...parseResStartline(startLine),
    headers,
  };
}

export function getHeadersFromString(headerString: string) {
  return parseHeaderString(headerString);
}

function makeHeaderObject(headerStrArr: string[]) {
  return headerStrArr.reduce((obj, v) => {
    const [key, value] = getKeyValueFromString(v);
    obj[key] = value;
    return obj;
  }, {});
}

export function getKeyValueFromString(str: string) {
  const [key, value] = str.split(':');
  return [key.trim(), value.trim()];
}

// tightly coupled, should have another layer in case we want to change Request config
// violation of SSR, responsible for building request && making body
export function buildRawHTTPRequest(config: HTTPConfig): string {
  const data = makeRequestBody(config);
  const filledInHeaders = fillInHeaders(config, data);
  config.headers = filledInHeaders;
  const rawHeaders = buildRawHTTPHeaders(config);

  return `${rawHeaders}${CRLF}${CRLF}${data}`;
}

function fillInHeaders(config: HTTPConfig, data: string) {
  const fillInHeaders = { ...config.headers };
  if (!fillInHeaders['Content-Length']) {
    fillInHeaders['Content-Length'] = data.length;
  }
  if (!fillInHeaders['Host']) {
    fillInHeaders['Host'] = config.host;
  }

  return fillInHeaders;
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
