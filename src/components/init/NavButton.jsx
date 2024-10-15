import React from 'react';


const NavButton = (props) => {
  return (
      <a className="MyButton singleNavButton" href={props.nav}>
          <p className="mclaren-regular">{props.text}</p>
      </a>
  );
};

export default NavButton;
