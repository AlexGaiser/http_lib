export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';

export interface RequestConfig {
  headers: HTTPHeaders;
  params?: {
    [param: string]: string | number | boolean;
  };
  data?: any;
  port?: number;
  url: string;
  method: Method;
}

export type HTTPHeaders = { [header: string]: string | number };

export interface HTTPConfig {
  host: string;
  port: number;
  data: any;
  path: string;
  method: Method;
  headers: HTTPHeaders;
  url: string;
}
