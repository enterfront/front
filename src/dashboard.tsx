import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { URLs } from './__data__/urls';

import HomePage from './pages/HomePage.jsx'
import Hello from './pages/Hello.jsx'
import Account from './pages/Account.jsx'

export const Dashboard = () => {
  return (
    <Routes>
        <Route path={URLs.baseUrl} element={<HomePage/>}/>
        <Route path={URLs.auth.url} element={<Hello/>} />
        <Route path={URLs.account.url} element={<Account/>}/>
    </Routes>
  );
};
