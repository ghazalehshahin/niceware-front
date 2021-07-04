
import React from 'react';
import {
  Button, makeStyles,
} from '@material-ui/core';
import { useState } from 'react';
import NavSubButton from './NavSubButton';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    position: 'relative',
  },
  button: {
    zIndex: theme.zIndex.appBar + 1,
    transition: 'all 0.3s'
  },
  buttonActive: {
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
  },
  buttonHover: {
    color: theme.palette.text.primary,
    backgroundColor: `${theme.palette.common.white} !important`,
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px 0px !important`,
  },
}));

const NavButton = ({
  route, color
}) => {
  const isActive = false;
  const classes = useStyles({ isActive });
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const buttonClassName = `${classes.button} ${isActive ? classes.buttonActive : ''} ${route.subRoutes && anchorEl ? classes.buttonHover : ''}`;

  const handleClick = () => {
    history.push(route.link);
  }

  return (
    <div className={classes.buttonWrapper} onMouseLeave={() => setAnchorEl(null)}>
      <Button
        color={color || 'default'}
        onClick={handleClick}
        className={buttonClassName}
        variant="text"
        onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
      >
        {route.title}
      </Button>
      {route.subRoutes?.length && (
        <NavSubButton
          open={!!anchorEl}
          subRoutes={route.subRoutes}
        />
      )}
    </div>
  );
};

export default NavButton;