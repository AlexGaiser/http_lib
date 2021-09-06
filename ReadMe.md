# HTTP Library

## Description

The purpose of this repository is to create a basic http client at as low a level as possible in Node.js. My goal in building this project was to understand how Node works under the hood and how many of the abstractions we take for granted when making HTTP network calls actually work. I found the subject extremely interesting, but it was a challenge to find useful sources of information. I have made this repository public so that anyone else who is interested in the subject will have easy access to a collection of articles and examples.

In addition, this is an exercise in creating an easy-to-use HTTP client using functional programming principles. The client interface takes inspiration from Axios.

Because of the way Node.js has been designed, there is a limit to how low we can go in this implementation. Some features (such as opening a TCP connection) are natively implemented in C/C++. This project is an exercise in creating an HTTP client relying on as few of the native Node.js abstractions as possible. 

In reality, Node.js implements a large part of the low-level logic related to HTTP in C/C++ code and many of the features I have implemented here will never need to be touched in the normal course of Node.js development. 


- [HTTP Library](#http-library)
  - [Description](#description)
  - [Requirements:](#requirements)
  - [How to Use](#how-to-use)
  - [Request syntax](#request-syntax)
  - [Anatomy of an HTTP Request](#anatomy-of-an-http-request)
  - [Sources](#sources)
    - [TCP Connections](#tcp-connections)
    - [HTTP](#http)
    - [How an http session works:](#how-an-http-session-works)
    - [Node](#node)
    - [HTTP Server](#http-server)
    - [Helpful Implementations](#helpful-implementations)
  - [Additional Features](#additional-features)
  - [What I learned](#what-i-learned)
## Requirements:

To be a fully featured HTTP client this project must: 

1. Take a user's configuration
2. Use that configuration to create the HTTP headers
3. Handle user's search parameters
4. Format the HTTP request body
5. Open a TCP connection to the correct address and port
6. Send the properly formatted HTTP request
7. Receive the response from the target HTTP server
8. Close the connection when the server is done sending data

## How to Use

If you are interested in seeing the `http_lib` in action simply: 

**Clone the repository:**

```bash
git clone https://github.com/AlexGaiser/http_lib.git
```

**Build and start the test server:**
```bash
npm run start:dev
```

**Send the test request from a separate terminal**
```bash
npm run send-req

```

You should see the proper response in the console!

## Request syntax

A client sends  _request messages_  to the server, which consist of:

-   A request line, consisting of the case-sensitive request method, a  space, the request target, another space, the protocol version, a carriage return, and a  line feed (e.g.  _GET /images/logo.png HTTP/1.1_);
-   Zero or more  [request header fields](https://en.wikipedia.org/wiki/HTTP_request_header_field "HTTP request header field"), each consisting of the case-insensitive field name, a colon, optional leading whitespace, the field value, and optional trailing whitespace (e.g.  _Accept-Language: en_), and ending with a carriage return and a line feed;
-   An empty line, consisting of a carriage return and a line feed;
-   An optional  [message body](https://en.wikipedia.org/wiki/HTTP_message_body "HTTP message body").

In the HTTP/1.1 protocol, all header fields except  _Host_  are optional.

**Important Note:** All sections of the HTTP request must be separated by the characters `\r\n`. The body section is separated from the headers by two sets of these characters: `\r\n\r\n`

```
`GET /test HTTP/1.1\r\nHost: localhost\r\nAccept: application/json\r\nContent-Type: application/json\r\nContent-Length: 28\r\nAccept-Encoding: gzip, deflate, br\r\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:58.0)\r\n\r\n{"text":"this is a comment"}`;

```
Note that in Javascript if we use backticks and formatting with spaces/newlines characters, the request will be malformed. The line breaks need to be `\r\n` **and nothing else**. Otherwise, the request will be malformed.

## Anatomy of an HTTP Request
![anatomy of an http request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages/http_response_headers3.png)

## Sources
### TCP Connections
- [https://www.section.io/engineering-education/tcp-node/](https://www.section.io/engineering-education/tcp-node/)
- [https://nodejs.org/api/net.html#net_identifying_paths_for_ipc_connections](https://nodejs.org/api/net.html#net_identifying_paths_for_ipc_connections)
- [https://nodejs.org/api/stream.html#stream_class_stream_duplex](https://nodejs.org/api/stream.html#stream_class_stream_duplex)

### HTTP
- [https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html)
- [https://www.w3.org/People/Frystyk/thesis/TcpIp.html](https://www.w3.org/People/Frystyk/thesis/TcpIp.html)
- [https://betterprogramming.pub/the-anatomy-of-an-http-request-728a469ecba9](https://betterprogramming.pub/the-anatomy-of-an-http-request-728a469ecba9)
- [https://stackoverflow.com/questions/4824451/detect-end-of-http-request-body](https://stackoverflow.com/questions/4824451/detect-end-of-http-request-body)

### How an http session works:
- [https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#HTTP_session](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#HTTP_session)

### Node
- [https://github.com/nodejs/node/tree/v16.7.0/lib](https://github.com/nodejs/node/tree/v16.7.0/lib)
- [https://github.com/nodejs/node/blob/v16.7.0/lib/http.js](https://github.com/nodejs/node/blob/v16.7.0/lib/http.js)
- [https://www.geeksforgeeks.org/handling-user-agents-in-node-js/](https://www.geeksforgeeks.org/handling-user-agents-in-node-js/)
- [https://medium.com/swlh/node-js-c-da454904811f](https://medium.com/swlh/node-js-c-da454904811f)

### HTTP Server
- [https://www.codementor.io/@ziad-saab/let-s-code-a-web-server-from-scratch-with-nodejs-streams-h4uc9utji](https://www.codementor.io/@ziad-saab/let-s-code-a-web-server-from-scratch-with-nodejs-streams-h4uc9utji)
- [https://notes.eatonphil.com/web-server-basics-http-and-sockets.html](https://notes.eatonphil.com/web-server-basics-http-and-sockets.html)

### Helpful Implementations
- [https://github.com/axios/axios](https://github.com/axios/axios)
- [https://github.com/axios/lib/core/dispatchRequest.js](https://github.com/axios/lib/core/dispatchRequest.js)
- [https://github.com/nodejs/node/blob/master/lib/_http_client.js](https://github.com/nodejs/node/blob/master/lib/_http_client.js)
- [https://github.com/nodejs/node/blob/master/lib/_http_outgoing.js](https://github.com/nodejs/node/blob/master/lib/_http_outgoing.js)


## Additional Features

This repository also includes sources I used to learn more about how Node.js interacts with HTTP and TCP/IP sockets. It includes sources that explain how/where/why Node.js dives into the C/C++ layer.

I have included the test servers I created while developing this project. They were useful for understanding the different types of protocols as well as how the socket connection layer works. 

I used an Express server to validate the HTTP requests sent by the client.




## What I learned

As an extra challenge, I have implemented as much of this project as possible using a purely functional approach. Mutations of state are kept to a minimum and functions are kept small and single purpose wherever possible. This was especially challenging do to the asynchronous nature of sending/receiving information. But it was a lot of fun. I plan on refactoring large portions of this code base in the future to see how easy it is to modify code using this approach.

It was interesting because many of the implementations I learned from had a very different approach, (most of them having been written several years ago). It was a good exercise to translate them into a different style.
