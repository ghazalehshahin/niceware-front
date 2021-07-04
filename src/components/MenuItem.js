import { TextField, Button, Typography, Grid, makeStyles, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import Link from '@material-ui/core/Link';
import { setToken } from '../service/action/appAction';
import { signupApi } from '../service/api/authApi';

const useStyles = makeStyles(theme => ({
    menuItemContainer: {
        
    }
}))
export default function MenuItem({val}) {
  const classes = useStyles();
  return (
    <div className={classes.menuItemContainer}>
        <Link
            component="button"
            variant="body2"
            onClick={() => {
            }}
            >
            {val}
        </Link>
    </div>
  );
}