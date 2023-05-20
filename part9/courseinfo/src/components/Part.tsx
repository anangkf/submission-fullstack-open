import React from 'react';
import { CourseParts } from './Content';

type PartProps = {
  part: CourseParts
}

const Part: React.FC<PartProps> = ({ part }) => {
  return (
    <p>
      {part.name} {part.exerciseCount}
    </p>
  );
};

export default Part;