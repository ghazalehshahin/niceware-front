import React from 'react';
import {
  Fade,
  makeStyles, MenuItem, Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  navSubButtonContainer: {
    position: 'absolute',
    top: theme.spacing(4.5),
  },
  navSubButtonPaper: {
    minWidth: 80,
    backgroundColor: theme.palette.common.white,
    borderRadius: `0px ${theme.shape.borderRadius * 2}px ${theme.shape.borderRadius * 2}px ${theme.shape.borderRadius * 2}px !important`,
    boxShadow: `0px ${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(-1)}px #00000040`,
  },
  buttonFiller: {
    height: theme.spacing(4.5),
  },
  button: {
  },
  buttonActive: {
    color: theme.palette.primary.dark,
    fontWeight: '500',
  },
}));

const NavSubButton = ({
  subRoutes, open, onMouseLeave,
}) => {
  const classes = useStyles();
  const history = useHistory();


  const handleClick = (link) => () => {
    history.push(link);
  }

  return (
    <Fade in={open} timeout={100}>
      <div className={classes.navSubButtonContainer} onMouseLeave={onMouseLeave}>
        <div className={classes.navSubButtonPaper}>
          {subRoutes.map((subRoute) => {
            const isActive = false;
            return (
              <MenuItem key={subRoute.link} onClick={handleClick(subRoute.link)}>
                <Typography
                  className={`${classes.button} ${isActive ? classes.buttonActive : ''}`}
                  variant="body2"
                  color="textPrimary"
                  component="a"
                >
                  {subRoute.title}
                </Typography>
              </MenuItem>
            );
          })}
        </div>
      </div>
    </Fade>
  );
};

export default NavSubButton;