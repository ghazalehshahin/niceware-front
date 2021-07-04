import React, { useEffect } from 'react';
import {BrowserRouter as Router, useHistory} from 'react-router-dom';
import Routes from './components/Routes';
import './App.css';
import { AppBar, Button, ThemeProvider, Toolbar } from '@material-ui/core';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUserId } from './service/action/appAction';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
