import React from 'react';
import { CourseParts } from './Content';

type TotalProps = {
  courseParts: CourseParts[]
}

const Total:React.FC<TotalProps> = ({ courseParts }) => {
  return (
    <p>
      Number of exercises{' '}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;