import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';

dotenv.config({ path: `${__dirname}/../.env` });

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', routes);

app.listen(port, () => console.log('App started on port %d', port));
