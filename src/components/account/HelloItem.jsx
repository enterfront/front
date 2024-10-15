import React from 'react';

const HelloItem = (props) => {
  return (
      <div className="hello-item-class">
          {!!props.nickname ? (
              <>
                  <h1 className="mclaren-regular">Hello, {props.nickname}!</h1>
                  <p className="mclaren-regular">Your ID: {props.id}</p>
              </>
          ) : (
              <p className="mclaren-regular">You don't have an account :(</p>
          )}
      </div>
  );
};

export default HelloItem;
