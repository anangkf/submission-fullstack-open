import express, {Request, Response} from 'express';
import { BmiInputArgsType, calculateBmi } from './bmiCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const { height, weight } = req.query;
  try {
    const bmi = calculateBmi(height as BmiInputArgsType, weight as BmiInputArgsType);
    res.json({ weight, height, bmi });
  } catch (error) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
});

export default app;
