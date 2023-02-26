import React, { useState } from 'react';

const Togglable = ({ buttonLabel, children, toggleHeader }) => {
  const [visibility, setVisibility] = useState(false);

  const toggleChildren = () => {
    if (toggleHeader) {
      toggleHeader();
    }
    setVisibility(!visibility);
  };

  // adding props to each props.children
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { toggleChildren });
    } return child;
  });

  if (visibility) {
    return childrenWithProps;
  }
  return (
    <button type="button" onClick={toggleChildren}>{buttonLabel}</button>
  );
};

export default Togglable;
