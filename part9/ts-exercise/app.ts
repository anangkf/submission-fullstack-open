import express, {Request, Response} from 'express';
import { BmiInputArgsType, calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

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

app.post('/exercises', (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    const exerciseResults = calculateExercises(daily_exercises as number[], target as number);
    res.json(exerciseResults);
  } catch (error) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
});

export default app;
