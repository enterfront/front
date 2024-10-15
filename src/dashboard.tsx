import React from "react";
import { Routes, Route } from "react-router-dom";

import { URLs } from "./__data__/urls";

import Home from "./pages/Home.jsx";
import Init from "./pages/Init.jsx";
import Account from "./pages/Account.jsx";
import Chat from "./pages/Chat.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";

export const Dashboard = () => {
  return (
    <Routes>
      <Route path={URLs.baseUrl} element={<Init />} />
      <Route path={URLs.home.url} element={<Home />} />
      <Route path={URLs.chat.url} element={<Chat />} />
      <Route path={URLs.auth.url} element={<SignIn />} />
      <Route path={URLs.reg.url} element={<SignUp />} />
      <Route path={URLs.account.url} element={<Account />} />
      <Route path="*" element={<h1>404 page not found</h1>} />
    </Routes>
  );
};
