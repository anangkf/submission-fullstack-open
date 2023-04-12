interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const RATING_DESCRIPTION = {
  BAD: 'Not too bad but could be better',
  OK: 'Well done, you accomplished your exercise goals for this week!',
  EXCELLENT: 'Wooh, you did exercise more than you planned. Well done!',
}

const calculateExercises = ( exercises: number[], target: number ): ExerciseResults => {
  let rating;
  let ratingDescription;
  
  const periodLength = exercises.length;
  const trainingDays = (exercises.filter((exc) => exc !== 0)).length;
  const totalHours = exercises.reduce((total: number, hours: number) => total + hours, 0);
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

  return { periodLength, trainingDays, success, rating, ratingDescription, target, average }
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 1.5)); //excellent