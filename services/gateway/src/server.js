import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import proxy from 'http-proxy-middleware';

dotenv.config({ path: `${__dirname}/../.env` });

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use('/api/users/**/tasks', proxy({
  changeOrigin: true,
  target: process.env.TASK_SERVICE_HOST,
}));
app.use('/api/users', proxy({
  changeOrigin: true,
  target: process.env.USER_SERVICE_HOST,
}));

app.listen(port, () => console.log('App started on port %d', port));
