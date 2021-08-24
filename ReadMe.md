# HTTP Library

## Description

The purpose of this repository is to create a basic http client starting from as low a level as possible in Node.js

Because of the way Node.js has been designed, there is a limit to how low we can go in this implementation. Some features (such as opening a TCP connection) are natively implemented in C/C++. This project is an exercise in creating an HTTP client starting at as low a level as possible in Node, relying on as few of the native Node.js abstractions as possible.

This is an academic exercise for the purpose of understanding how Node works under the hood and how many of the abstractions we take for granted when making HTTP network calls actually work. 

## Requirements:

To create an HTTP request the client must: 

1. Open a TCP connection to the correct address and port
2. Send the properly formatted data
3. Receive the response from the target HTTP server
4. Close the connection (For MVP+ we may add keep-alive mechanism)

## HTTP Request Details

### Request syntax

A client sends  _request messages_  to the server, which consist of:

-   a request line, consisting of the case-sensitive request method, a  space, the request target, another space, the protocol version, a carriage return, and a  line feed (e.g.  _GET /images/logo.png HTTP/1.1_);
-   zero or more  [request header fields](https://en.wikipedia.org/wiki/HTTP_request_header_field "HTTP request header field"), each consisting of the case-insensitive field name, a colon, optional leading whitespace, the field value, and optional trailing whitespace (e.g.  _Accept-Language: en_), and ending with a carriage return and a line feed;
-   an empty line, consisting of a carriage return and a line feed;
-   an optional  [message body](https://en.wikipedia.org/wiki/HTTP_message_body "HTTP message body").

In the HTTP/1.1 protocol, all header fields except  _Host_  are optional.

**Raw HTTP example:**
```

```
