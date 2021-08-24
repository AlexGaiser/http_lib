import express from 'express';
import config from './config';

const args = process.argv.slice(2);

const [userPort] = args;

const PORT = userPort || config.defaultPort;

const app = express();

app.listen(PORT);
console.log(`server listening on port ${PORT}`);

app.get('/test', (req, res) => {
  console.log(req.headers);
  res.json({
    response: 'success!',
  });
});
