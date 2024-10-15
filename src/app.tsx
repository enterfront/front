import React, {useEffect} from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from './dashboard';

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import './index.css'
import {displayMessage} from "./backend/notifications/notifications.js";
import {MessageType} from "./backend/notifications/message";

const App = () => {
    useEffect(() => {
        document.title = 'Enterfront';
    }, []);

    useEffect(() => {
        const msg = localStorage.getItem('message');

        if (!msg) return;

        displayMessage(msg, MessageType.SUCCESS);
        localStorage.removeItem('message');
    }, []);

  return(
      <div>
          <BrowserRouter>
              <Dashboard />
          </BrowserRouter>

          <ToastContainer/>
      </div>

  )
}

export default App;
