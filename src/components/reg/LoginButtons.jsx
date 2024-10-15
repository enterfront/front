import React from 'react';
import { URLs } from "../../__data__/urls";

const LoginButtons = (props) => {
    const ref = props.isAuth ? URLs.reg.url : URLs.auth.url

  return (
      <div>
          <div className="LoginButtons">
              <a className="MyButton loginButton" onClick={() => (
                  props.submitHandler()
              )}>
                  {props.isAuth
                      ? <p className="mclaren-regular">Login</p>
                      : <p className="mclaren-regular">Register</p>}
              </a>

              <a className="MyButton loginButton" href={ref}>
                  {props.isAuth
                      ? <p className="mclaren-regular">Registration</p>
                      : <p className="mclaren-regular">I have an account</p>}
              </a>
          </div>
      </div>
  );
};

export default LoginButtons;
