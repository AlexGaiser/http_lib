# HTTP Library

## Description

The purpose of this repository is to create a basic http client at low a level as possible in Node.js

Because of the way Node.js has been designed, there is a limit to how low we can go in this implementation. Some features (such as opening a TCP connection) are natively implemented in C/C++. This project is an exercise in creating an HTTP client starting at as low a level as possible in Node, relying on as few of the native Node.js abstractions as possible.

This is strictly an academic exercise for the purpose of understanding how Node works under the hood and how many of the abstractions we take for granted when making HTTP network calls actually work. 

In addition, this is an exercise in creating an easy-to-use HTTP client. The client interface takes inspiration from Axios.

In reality, Node.js implements a large part of the low-level logic related to HTTP in C/C++ code.

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

### Request syntax

A client sends  _request messages_  to the server, which consist of:

-   a request line, consisting of the case-sensitive request method, a  space, the request target, another space, the protocol version, a carriage return, and a  line feed (e.g.  _GET /images/logo.png HTTP/1.1_);
-   zero or more  [request header fields](https://en.wikipedia.org/wiki/HTTP_request_header_field "HTTP request header field"), each consisting of the case-insensitive field name, a colon, optional leading whitespace, the field value, and optional trailing whitespace (e.g.  _Accept-Language: en_), and ending with a carriage return and a line feed;
-   an empty line, consisting of a carriage return and a line feed;
-   an optional  [message body](https://en.wikipedia.org/wiki/HTTP_message_body "HTTP message body").

In the HTTP/1.1 protocol, all header fields except  _Host_  are optional.

**Anatomy of an HTTP Request:**


## Additional Features

This repository also includes sources I used to learn more about how Node.js interacts with HTTP and TCP/IP sockets. It includes sources that explain how/where/why Node.js dives into the C/C++ layer.

I have included the test servers I created while developing this project. They were useful for understanding the different types of protocols as well as how the socket connection layer works. 

I used an Express server to validate the HTTP requests sent by the client.


## What I learned

As an extra challenge, I have implemented as much of this project as possible using a purely functional approach. Mutations of state are kept to a minimum and functions are kept small and single purpose wherever possible. This was especially challenging do to the asynchronous nature of sending/receiving information. But it was a lot of fun. I plan on refactoring large portions of this code base in the future to see how easy it is to modify code using this approach.

It was interesting because many of the implementations I learned from had a very different approach, (most of them having been written several years ago). It was a good exercise to translate them into a different style.
