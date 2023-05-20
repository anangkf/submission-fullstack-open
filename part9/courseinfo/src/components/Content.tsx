import React from 'react';
import Part from './Part';
import { CoursePart } from '../App';

type ContentProps = {
  courseParts: CoursePart[]
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((part, idx) => (
        <Part key={idx} part={part} />
      ))}
    </>
  );
};

export default Content;