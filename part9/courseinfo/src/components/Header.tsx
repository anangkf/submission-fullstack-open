import React from 'react';

type HeaderProps = {
  courseName: string
}

const Header: React.FC<HeaderProps> = ({ courseName }) => {
  return (
    <>
      <h1>{courseName}</h1>
    </>
  );
};

export default Header;