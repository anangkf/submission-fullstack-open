import React from 'react';
import { CoursePart } from '../App';
// import assertNever from '../utils/assertNever';

type PartProps = {
  part: CoursePart
}

const Part: React.FC<PartProps> = ({ part }) => {
  switch(part.kind) {
  case 'basic':
    return (
      <div style={{paddingBottom: 10}}>
        <span style={{ fontWeight: 'bold' }}>
          {part.name} {part.exerciseCount}
        </span><br />
        <span><em>{part.description}</em></span><br />
      </div> 
    );
  case 'group':
    return (
      <div style={{paddingBottom: 10}}>
        <span style={{ fontWeight: 'bold' }}>
          {part.name} {part.exerciseCount}
        </span><br />
        <span>project exercises {part.groupProjectCount}</span><br />
      </div> 
    );
  case 'background':
    return (
      <div style={{paddingBottom: 10}}>
        <span style={{ fontWeight: 'bold' }}>
          {part.name} {part.exerciseCount}
        </span><br />
        <span><em>{part.description}</em></span><br />
        <span>submit to {part.backgroundMaterial}</span><br />
      </div> 
    );
  case 'special':
    return (
      <div style={{paddingBottom: 10}}>
        <span style={{ fontWeight: 'bold' }}>
          {part.name} {part.exerciseCount}
        </span><br />
        <span><em>{part.description}</em></span><br />
        <span>required skills: {part.requirements.join(', ')}</span><br />
      </div> 
    );
  default:
    // assertNever(part);
    return null;
  }
};

export default Part;