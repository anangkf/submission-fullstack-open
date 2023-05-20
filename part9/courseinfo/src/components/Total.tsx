import React from 'react';
import { CoursePart } from '../App';

type TotalProps = {
  courseParts: CoursePart[]
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