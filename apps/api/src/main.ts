import * as express from 'express';
import * as fs from 'fs';
import { Client } from 'pg';
import { postLink } from './app/postLink';
import { getLink } from './app/getLink';

const app = express();
app.use(express.json())

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();

app.post('/api/post', postLink(client))
app.get('/api/get/:id', getLink(client))

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  if (process.env.DYNO) {
    fs.openSync('/tmp/app-initialized', 'w');
  }
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
