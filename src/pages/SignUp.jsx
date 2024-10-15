import React, {useState} from 'react';
import InputField from "../components/reg/InputField.jsx";
import LoginButtons from "../components/reg/LoginButtons.jsx";
import LoginTitle from "../components/reg/loginTitle.jsx";
import {post} from "../backend/api";
import {displayMessage} from "../backend/notifications/notifications";
import {MessageType} from "../backend/notifications/message";
import { URLs } from "../__data__/urls";


const SignUp = () => {
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    async function login(name, password) {
        const {ok, data} = await post('/auth/login', {name: name, password: password});
        return {loginStatus: ok, loginData: data};
    }

    async function submit () {
        console.log('Sign Up!');

        if (password !== repeatPassword) {
            displayMessage("Passwords don't match", MessageType.WARN);
            return;
        }

        const {ok, data} = await post('/auth/reg',
            {name: name, password: password, nickname: nickname});

        if (!ok) {
            displayMessage(data.message, MessageType.ERROR);
            return;
        }

        const { loginStatus, loginData } = await login(name, password);

        console.log(loginStatus, loginData)

        if (!loginStatus) {
            displayMessage(loginData.message, MessageType.ERROR);
            return;
        }

        localStorage.setItem('token', loginData.token);
        localStorage.setItem('username', name);

        localStorage.setItem('message', 'Successfully signed up!');
        window.location.href = URLs.baseUrl;
    }

    return (
        <div className="LoginList">
            <LoginTitle/>
            <InputField title="Name" setValue={setName} value={name}/>
            <InputField title="Nickname (for others)" setValue={setNickname} value={nickname}/>
            <InputField title="Password" setValue={setPassword} value={password}/>
            <InputField title="Repeat Password" setValue={setRepeatPassword} value={repeatPassword}/>

            <LoginButtons
                submitHandler={submit}
                isAuth={false}
            />
        </div>
    );
};

export default SignUp;
