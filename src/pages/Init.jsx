import React from "react";
import NavButton from "../components/init/NavButton.jsx";
import {URLs} from "../__data__/urls";
import InitTitle from "../components/init/InitTitle.jsx";

const Init = () => {
  return (
      <div className="backgroundImage">
          <div className="blurEffect"></div>
          <div className="overBlur initTitlePos">
              <InitTitle/>
          </div>
          <div className="navButtons overBlur">
              <NavButton nav={URLs.home.url} text={"Start chatting"}/>
              <NavButton nav={URLs.auth.url} text={"Sign In"}/>
              <NavButton nav={URLs.reg.url} text={"Sign Up"}/>
          </div>
      </div>
  )
}

export default Init;