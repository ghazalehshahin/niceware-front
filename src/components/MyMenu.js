import { TextField, Button, Typography, Grid, makeStyles, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Menu } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { setToken } from '../service/action/appAction';
import { signupApi } from '../service/api/authApi';
import MenuItem from './MenuItem';

const useStyles = makeStyles(theme => ({
    menuContainer: {
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
    }
}))

function Itemlist(props) {
  const items = props.items;
  const listItems = items.map((item) =>
    <MenuItem  val={item}></MenuItem>
  );
  return (
    <div>{listItems}</div>
  );
}
export default function MyMenu({items, anchorEl, onClose}) {
  const classes = useStyles();
  return (
    <Menu className={classes.menuContainer} open = {!!anchorEl} anchorEl = {anchorEl} onClose = {onClose} anchorOrigin = {{vertical: 'bottom', horizontal: 'left'}}>
        <Itemlist items = {items}/>
    </Menu>
  );
}