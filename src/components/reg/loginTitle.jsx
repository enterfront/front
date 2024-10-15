import React from 'react';
import { URLs } from "../../__data__/urls";

const LoginTitle = () => {
  return (
      <a href={URLs.baseUrl}>
          <h1 className="loginTitle mclaren-regular">Enterfront</h1>
      </a>
  );
};

export default LoginTitle;
