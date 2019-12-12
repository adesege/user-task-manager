import dotenv from 'dotenv';
import express from 'express';
import userTaskRoutes from './routes/user-task';

dotenv.config({ path: `${__dirname}/../.env` });

const app = express();
const port = process.env.PORT || 5002;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userTaskRoutes);

if (!process.env.NOW_REGION) {
  app.listen(port, () => console.log('App started on port %d', port));
}

export default app;
