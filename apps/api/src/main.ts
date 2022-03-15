import * as express from 'express';
import * as fs from 'fs';
import { Message } from '@ready-set-redirect/api-interfaces';
import { Client } from 'pg';
import { postLink } from './app/postLink';
import { getLink } from './app/getLink';

const app = express();
app.use(express.json())

const credentials = {
  user: 'qyofjenh',
  host: 'kashin.db.elephantsql.com',
  database: 'qyofjenh',
  password: '6jOngQrbqqmISaCm3vmpKNRrbPWky3LS',
  port: 5432,
};

const client = new Client(credentials);
client.connect();

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

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
