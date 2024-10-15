import React from 'react';
import chatIcon from './../../../images/chat.svg';
import { URLs } from "../../__data__/urls";

const HomeTitle = () => {
  return (
      <a className="homeTitleWrapper" href={URLs.baseUrl}>
          <h1 className="montecarlo-regular homeTitle">Enterfront</h1>
          <img src={chatIcon} alt="Chat Icon" className="chatIcon"/>
      </a>
  );
};

export default HomeTitle;
