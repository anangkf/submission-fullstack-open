import express, {Request, Response} from 'express';

const app = express();

app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
})

export default app;
