import http from 'node:http';
import express from 'express';
import injectSocketIO from '../socketiohandler'; 
import {handler} from '../build/handler';

const app = express();
const server = http.createServer(app);

injectSocketIO(server);

app.use(handler);

server.listen(5173,()=>{
  console.log('Running on localhost:3000');
});
