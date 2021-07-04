import { Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import MyMenu from './MyMenu';

const useStyles = makeStyles(theme => ({
    menuContainer: {
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
    }
}))

export default function MyButton({val, categories}) {
  const classes = useStyles();
  const [show, setShow] = useState(null);
  const [items, setItems] = useState(null);
  const history = useHistory();
  const handleLinkClick = (path) => () => {
       history.push(`/${path}`);
  }

  const handleMouseHover = (val) => (e) => {
      setItems(categories);
      setShow(e.currentTarget);
  }
  const handleMouseNotHover = () => {
      setShow(null);
  }


  return (
    <Button  className={classes.navContainer} item container 
        onMouseEnter={handleMouseHover(val)}
        onMouseLeave={handleMouseNotHover}
        onClick={handleLinkClick(val)}>
        {val}
        <MyMenu items = {items} anchorEl = {show} onClose={() => setShow(null)}/>
    </Button>
  );
}