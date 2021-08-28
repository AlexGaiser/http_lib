import { RequestConfig } from '../http_client/types';

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

export const makeUrlString = (config: RequestConfig): string => {
  const baseUrl = config.url;
  const paramString = makeQueryParamStr(config.params);

  return `${baseUrl}${paramString}`;
};
