import express from 'express';
import cors from 'cors';
import defaultRoute from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api', defaultRoute);

export default app;