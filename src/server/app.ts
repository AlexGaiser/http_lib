import express from 'express';
import config from './config';

const args = process.argv.slice(2);

const [userPort] = args;

const PORT = userPort || config.defaultPort;

const app = express();
app.use(express.json());
app.listen(PORT);
console.log(`server listening on port ${PORT}`);

app.get('/test', (req, res) => {
  console.log('GET', req);
  console.log('headers', req.headers);
  console.log('query', req.query);
  console.log('body', req.body);
  res.json({
    response: 'success!',
  });
});

app.post('/test', (req, res) => {
  // console.log('POST', req);

  console.log('headers', req.headers);
  console.log('query', req.query);
  console.log('body', req.body);
  res.json({
    response: 'success!',
  });
});
