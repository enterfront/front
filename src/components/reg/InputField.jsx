import React from 'react';

const InputField = (props) => {
    console.log('class:', props.className)
  return (
      <div>
          <p>{props.title}</p>
          <input
              onChange={(e) => props.setValue(e.target.value)}
              value={props.value}
              className="Input"
              placeholder={(props.placeholder) ? props.placeholder : ''}
              onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                      if (props.submit) {
                          props.enter(props.submit);
                      }
                  }
              }}
          />
      </div>
  );
};

export default InputField;
