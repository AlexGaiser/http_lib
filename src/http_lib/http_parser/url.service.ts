import { RequestConfig } from '../http_client/types';
import { URL } from 'url';
export type QueryParamsObject = {
  [param: string]: string | number | boolean;
};
/**
 * @description takes an object and returns a valid query param string, starting with '?'
 * @returns query param string starting with ?
 */
export const makeQueryParamStr = (
  params: QueryParamsObject,
): string => {
  if (!params) return '';

  return Object.keys(params)
    .reduce((strArr, key) => {
      const newParam =
        strArr.length < 1
          ? `?${key}=${params[key]}`
          : `${key}=${params[key]}`;

      strArr.push(newParam);

      return strArr;
    }, [])
    .join('&');
};

export function getHostFromURL(url: string): string {
  return new URL(url).hostname;
}

export function getPortFromURL(url: string): number {
  return parseInt(new URL(url).port);
}

export function getPathFromURL(url: string): string {
  const urlObj = new URL(url);
  return `${urlObj.pathname || ''}${urlObj.search || ''}`;
}

export const makeUrlString = (config: RequestConfig): string => {
  const baseUrl = config.url;
  const paramString = makeQueryParamStr(config.params);

  return `${baseUrl}${paramString}`;
};
