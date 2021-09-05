import {
  getHeadersFromString,
  getKeyValueFromString,
} from '../http_parser';

describe('Test HTTP Parser Functions', () => {
  it('should return headers as object', () => {
    const httpString = `GET /test HTTP/1.1\r\nHost: localhost\r\nAccept: application/json\r\nContent-Type: application/json\r\nContent-Length: 28\r\nAccept-Encoding: gzip, deflate, br\r\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:58.0)\r\n\r\n{"text":"this is a comment"}`;
    const headers = getHeadersFromString(httpString);
    console.log(headers);
    expect(headers[0]).toBe('GET /test HTTP/1.1');
  });

  it('should get key value from string', () => {
    const [key, value] = getKeyValueFromString('key: value');
    expect(key).toBe('key');
    expect(value).toBe('value');
  });
});
