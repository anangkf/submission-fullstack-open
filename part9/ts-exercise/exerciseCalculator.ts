import { isNumber } from "./isNumber";

export interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export type ExerciseArgsType = {
  daily_exercises: number[];
  target: number;
};

const RATING_DESCRIPTION = {
  BAD: 'Not too bad but could be better',
  OK: 'Well done, you accomplished your exercise goals for this week!',
  EXCELLENT: 'Wooh, you did exercise more than you planned. Well done!',
};

export const calculateExercises = (dailyExercisesInput: number[], targetInput: number): ExerciseResults => {
  const { daily_exercises, target } = parseArgs(dailyExercisesInput, targetInput);
  let rating;
  let ratingDescription;
  
  const periodLength = daily_exercises.length;
  const trainingDays = (daily_exercises.filter((exc) => exc !== 0)).length;
  const totalHours = daily_exercises.reduce((total: number, hours: number) => total + hours, 0);
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

function parseArgs (dailyExercisesInput: number[], targetInput: number): ExerciseArgsType {
  const daily_exercises = dailyExercisesInput.map((hour) => Number(hour));
  
  if (daily_exercises.includes(NaN)) {
    throw new Error('Exercise hours array should only contain numbers');
  } 
  if (!isNumber(targetInput)) {
    throw new Error('First arguments should be number (target)');
  }

  return {
    daily_exercises,
    target: Number(targetInput)
  };
}