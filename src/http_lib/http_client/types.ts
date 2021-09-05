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
  headers: {
    [header: string]: string | number;
  };
  params?: {
    [param: string]: string | number | boolean;
  };
  data?: any;
  port?: number;
  url: string;
  method: Method;
}

export interface HTTPConfig {
  host: string;
  port: number;
  data: any;
  path: string;
  method: Method;
  headers: {
    [header: string]: string | number;
  };
  url: string;
}
