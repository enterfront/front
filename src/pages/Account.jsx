import React, {useEffect, useState} from "react";
import AccountButtons from "../components/account/AccountButtons.jsx";
import userIcon from "../../images/user.svg";
import {get, post} from "../backend/api";
import {displayMessage} from "../backend/notifications/notifications";
import {MessageType} from "../backend/notifications/message";
import HelloItem from "../components/account/HelloItem.jsx";
import { URLs } from "../__data__/urls";

const Account = () => {
    const exitHandler = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");

        localStorage.setItem("message", "Exited successfully!");
        window.location.href = "/";
    }

    const [nickname, setNickname] = useState("");
    const [id, setId] = useState("");

    async function changeNameHandler (newNickname) {
        if (!newNickname) return;

        const {ok, data} = await post('/change/nickname', {id: id, newNickname: newNickname});

        if (!ok) {
            displayMessage(data.message, MessageType.ERROR);
        } else {
            localStorage.setItem("message", "Name was changed");
            window.location.href = URLs.account.url;
        }
    }

    async function changePassHandler (newPass){
        if (!newPass) return;

        const {ok, data} = await post('/change/password', {id: id, newPassword: newPass});

        if (!ok) {
            displayMessage(data.message, MessageType.ERROR);
        } else {
            localStorage.setItem("message", "Password was changed");
            window.location.href = URLs.account.url;
        }
    }

    async function getUser() {
      const username = localStorage.getItem("username");
      if (!username) {
          displayMessage("You're not logged in!", MessageType.WARN);
          return;
      }

      const {ok, data} = await get('/auth/' + username);
      if (!ok) {
          displayMessage("Some error with auth:" + data.message, MessageType.ERROR);
          return;
      }

      setNickname(data.user.nickname);
      setId(username);
    }

    useEffect(() => {getUser().then()}, [])

  return (
      <div className="account-items">
        <img src={userIcon} alt="user" />
        <HelloItem nickname={nickname} id={id} />
        <AccountButtons
            exitHandler={exitHandler}
            changeNameHandler={changeNameHandler}
            changePassHandler={changePassHandler}
            registered={!!nickname}
        />
      </div>
  );
};

export default Account;
