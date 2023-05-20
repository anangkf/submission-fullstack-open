import React from 'react';
import Part from './Part';

export type CourseParts = {
  name: string;
  exerciseCount: number;
}

type ContentProps = {
  courseParts: CourseParts[]
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