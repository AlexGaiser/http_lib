import { makeQueryParamStr, QueryParamsObject } from '../url.service';

describe('Test QueryParams Functions', () => {
  const params: QueryParamsObject = {
    bool: true,
    num: 10,
    str: 'stringparam',
  };

  it('should return a valid queryParams string', () => {
    const paramString = makeQueryParamStr(params);
    expect(paramString).toBe('?bool=true&num=10&str=stringparam');
  });
});
