import { TextField, Button, Typography, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { setToken, setUserId, setCredit, setWholePrice } from '../service/action/appAction';
import { loginApi } from '../service/api/authApi';

const useStyles = makeStyles(theme => ({
  loginPageContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '100%',
    backgroundColor: theme.palette.grey[100],
    margin: theme.spacing(0, 3),
    [theme.breakpoints.up('xs')]: {
      width: 400,
    }
  },
  logoContainer: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 2),
  },
  formContainer: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 2),
  },
  signupContainer: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 2),
    color: '#145DA0',
  }
}))

export default function Login({}) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(0);

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const isLoggedIn = useSelector(state => state.app.isLoggedIn);
  useEffect(()=>{
    if(isLoggedIn){
      history.push('/');
    }
  },[isLoggedIn, history])
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError(0);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(0);
  }

  const handleSignup = (e) =>{
    history.push('/signup');
  }
  const handleSubmit = async (e) => {
    if(!username || !password) {
      setError(1);
    } else {
      try {
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('access_token');
        localStorage.removeItem('credit');
        const response = await loginApi(username, password);
        const token = response.data['token'];
        const userId = response.data['id'];
        const userRole = response.data['role'];
        const credit = response.data['credit'];
        dispatch(setToken({ token }));
        dispatch(setUserId({userId, role: userRole}));
        dispatch(setCredit({credit}));
        localStorage.setItem('userId',userId);
        localStorage.setItem('credit' , credit);
        localStorage.setItem('userRole',userRole);
        localStorage.setItem('access_token', token);
        if(userRole === 1){
            history.push('/homeseller');
        }else{
            history.push('/');
        }
      } catch(e) {
        setError(3);
      }
    }
  }

  return (
    <div className={classes.loginPageContainer}>
      <Grid className={classes.loginContainer} container>
        <Grid  className={classes.logoContainer} item container>
          logo
        </Grid>
        <Grid  className={classes.formContainer} item container spacing={2}>
          <Grid item xs={12}>
            <TextField 
              label="Username"
              variant="outlined"
              fullWidth
              size="small"
              value={username}
              onChange={handleUsernameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Password"
              variant="outlined"
              fullWidth
              size="small"
              InputProps={{
                type: 'password'
              }}
              value={password}
              onChange={handlePasswordChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Grid>
          {error === 1 && (
            <Grid item xs={12}>
              <Typography
                color="error"
                variant="subtitle2"
              >
                Username or password cannot be empty.
              </Typography>
            </Grid>
          )}
          {error === 3 && (
            <Grid item xs={12}>
              <Typography
                color="error"
                variant="subtitle2"
              >
                Username or password is incorrect.
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid  className={classes.signupContainer} item container onClick={handleSignup}>
          sign up
        </Grid>
      </Grid>
    </div>
  );
}