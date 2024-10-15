import React from 'react';

const ActionButton = (props) => {
  return (
      <a className="MyButton mclaren-regular" onClick={() => {
          props.action()
      }}>{props.title}</a>
  );
};

export default ActionButton;
