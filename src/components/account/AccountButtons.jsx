import React, {useState} from 'react';
import { URLs } from "../../__data__/urls";
import ActionButton from "./ActionButton.jsx";
import InputField from "../reg/InputField.jsx";

const AccountButtons = (props) => {
    const [chName, setChName] = useState(false);
    const [chPassword, setChPassword] = useState(false);

    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

  return (
      <div className="account-buttons">
          {props.registered ? (
              <>
                  <ActionButton title={"Exit"} action={props.exitHandler}/>
                  <ActionButton title={"Change Name"} action={() => setChName(true)}/>
                  {chName ? (
                      <InputField
                          title={""}
                          value={nickname}
                          setValue={setNickname}
                          placeholder='Enter your new nickname'

                          submit={nickname}
                          enter={props.changeNameHandler}
                      />
                  ) : null}
                  <ActionButton title={"Change Pass"} action={() => setChPassword(true)}/>
                  {chPassword ? (
                      <div>
                          <InputField
                              title={""}
                              value={password}
                              setValue={setPassword}
                              placeholder='Enter your new password'

                              submit={password}
                              enter={props.changePassHandler}
                          />
                      </div>
                  ) : null}
              </>
          ) : null}
          <a className="MyButton mclaren-regular" href={URLs.home.url}>Back</a>
      </div>
  );
};

export default AccountButtons;
