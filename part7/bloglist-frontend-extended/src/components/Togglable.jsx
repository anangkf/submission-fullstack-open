import React, { useState } from "react";
import PropTypes from "prop-types";

const Togglable = ({ buttonLabel = "toggle", children, toggleHeader }) => {
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
    }
    return child;
  });

  if (visibility) {
    return childrenWithProps;
  }
  return (
    <button className="bg-green-400 px-2 rounded-sm my-2" type="button" onClick={toggleChildren}>
      {buttonLabel}
    </button>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
