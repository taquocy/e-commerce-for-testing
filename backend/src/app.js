import 'dotenv/config';
import './clients/db';
import express from 'express';
import Boom from 'boom';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use((req, res, next) => {
  return next(Boom.notFound('This route does not exist.'));
});

app.use((err, req, res, next) => {
  console.error(err);
  if (err.isBoom) {
    return res.status(err.output.statusCode).json(err.output.payload);
  }
  return res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is up on port ${PORT}!`));