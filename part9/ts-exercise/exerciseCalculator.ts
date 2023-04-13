import { isNumber } from "./isNumber";

interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

type ExerciseArgs = {
  exerciseHours: number[];
  target: number;
};

const RATING_DESCRIPTION = {
  BAD: 'Not too bad but could be better',
  OK: 'Well done, you accomplished your exercise goals for this week!',
  EXCELLENT: 'Wooh, you did exercise more than you planned. Well done!',
};

const calculateExercises = (): ExerciseResults => {
  const { exerciseHours, target } = parseArgs(process.argv);
  let rating;
  let ratingDescription;
  
  const periodLength = exerciseHours.length;
  const trainingDays = (exerciseHours.filter((exc) => exc !== 0)).length;
  const totalHours = exerciseHours.reduce((total: number, hours: number) => total + hours, 0);
  const average = Number((totalHours / periodLength).toFixed());
  const success = average >= target;

  switch (true) {
    case (average < target):
      rating = 1;
      ratingDescription = RATING_DESCRIPTION.BAD;
      break;
    case (average === target):
      rating = 2;
      ratingDescription = RATING_DESCRIPTION.OK;
      break;
    default:
      rating = 3;
      ratingDescription = RATING_DESCRIPTION.EXCELLENT;
  }

  return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

function parseArgs ( args: string[] ): ExerciseArgs {
  if (args.length < 4) throw new Error('Not enough arguments');
  const [ , , target, ...exercises ] = args;
  const exerciseHours = exercises.map((hour) => Number(hour));
  
  if (exerciseHours.includes(NaN)) {
    throw new Error('Exercise hours array should only contain numbers');
  } 
  if (!isNumber(target)) {
    throw new Error('First arguments should be number (target)');
  }

  return {
    exerciseHours,
    target: Number(target)
  };
}

console.log(calculateExercises());