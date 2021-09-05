/**
This is an HTTP server created using express
It will respond with dummy data and log out the headers, query params,
and body sent to it. It for testing the validity of the http requests 
sent from the HTTP client which is the subject of this repository
*/

import express from 'express';
import config from './config';
import { DUMMY_DATA } from './data';
const args = process.argv.slice(2);

const [userPort] = args;

const PORT = userPort || config.defaultPort;

const app = express();
app.use(express.json());
app.listen(PORT);
console.log(`server listening on port ${PORT}`);

app.get('/test', (req, res) => {
  console.log('headers', req.headers);
  console.log('query', req.query);
  console.log('body', req.body);
  res.json({
    response: DUMMY_DATA,
  });
});

app.post('/test', (req, res) => {
  console.log('headers', req.headers);
  console.log('query', req.query);
  console.log('body', req.body);
  res.json({
    response: DUMMY_DATA,
  });
});

app.put('/test', (req, res) => {
  console.log('headers', req.headers);
  console.log('query', req.query);
  console.log('body', req.body);
  res.json({
    response: DUMMY_DATA,
  });
});

app.delete('/test', (req, res) => {
  console.log('headers', req.headers);
  console.log('query', req.query);
  console.log('body', req.body);
  res.json({
    response: DUMMY_DATA,
  });
});)