import React, {useState} from 'react';
import InputField from "../components/reg/InputField.jsx";
import LoginButtons from "../components/reg/LoginButtons.jsx";
import LoginTitle from "../components/reg/loginTitle.jsx";

import {MessageType} from "../backend/notifications/message.tsx";
import {displayMessage} from "../backend/notifications/notifications.js";
import {post} from "../backend/api.js";
import {URLs} from "../__data__/urls";

const SignIn = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [nameErrorsCounter, setNameErrorsCounter] = useState(0);

    async function submit() {
        console.log('Sign In!')

        const {ok, data} = await post('/auth/login', {name: name, password: password});

        if (!ok) {
            displayMessage(data.message, MessageType.ERROR);

            if (nameErrorsCounter >= 1) {
                displayMessage("Note that you need to enter your ID name", MessageType.INFO);
                setNameErrorsCounter(0);
            } else {
                setNameErrorsCounter(nameErrorsCounter + 1);
            }

            return;
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('username', name);

        setNameErrorsCounter(0);

        localStorage.setItem('message', 'Successfully logged in!');
        window.location.href = URLs.baseUrl;
    }

  return (
      <div className="LoginList">
          <LoginTitle/>
          <InputField title="Name" setValue={setName} value={name}/>
          <InputField title="Password" setValue={setPassword} value={password}/>

          <LoginButtons
              submitHandler={submit}
              isAuth={true}
          />
      </div>
  );
};

export default SignIn;
