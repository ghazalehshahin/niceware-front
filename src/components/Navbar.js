import React, { useEffect, useState } from 'react';
import { AppBar, Badge, Button, Grid, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router";
import NavButton from './NavButton';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../service/action/appAction';
import { cats, subscats } from '../utils/constants';
import { ShoppingCart } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    navContainer: {
        color: '#ffffff',
    },
    signContainer:{
        color: '#ffffff',
    }
  }))

export default function Navbar() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.app.isLoggedIn);
    const cartProducts = useSelector(state => state.cart.items);
    const userRole = useSelector(state => state.app.userRole);
    const credit = localStorage.getItem('credit');
    const isSeller = isLoggedIn && parseInt(userRole) === 1;
    console.log(isLoggedIn, userRole);
    const handleLinkClick = (path) => () => {
         history.push(`/${path}`);
    }

    const routes = cats.map(cat => ({
      link: `/${cat.fields.name}`,
      title: `${cat.fields.name}`,
      subRoutes: subscats.map(subcat => ({
        link: `/${cat.fields.name}?subcat=${subcat.fields.name}`,
        title: `${subcat.fields.name}`,
      }))
    }));

    const location = useLocation();
    const shouldRenderNavbar = !location.pathname.toLowerCase().startsWith('/login') || !location.pathname.toLowerCase().startsWith('/signup');
    const handleLogout = () => {
      dispatch(clearToken());
      localStorage.removeItem('userId');
      localStorage.removeItem('access_token');
    }

    return ( shouldRenderNavbar && 
        <AppBar>
          <Toolbar>
            <Grid className={classes.navContainer} container alignItems="center">
              <Grid item>
                <Button onClick={handleLinkClick('')} color="inherit">
                  Home
                </Button>
              </Grid>
              {Object.values(routes).map((value) => (
                <Grid item>
                  <NavButton route={value} color="inherit"/>
                </Grid>
              ))}
              {isSeller && (
                <>
                  <Grid item>
                    <Button  onClick={handleLinkClick('homeseller')} color="inherit">
                      Seller page
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button  onClick={handleLinkClick('sellerpage')} color="inherit">
                      Create product
                    </Button>
                  </Grid>
                </>
              )}
              {isLoggedIn
              ? (
                <>
                  <Grid item xs />
                  <Grid item>
                    <IconButton  onClick={handleLinkClick('shopping-cart')} color="inherit">
                      <Badge badgeContent={cartProducts?.length} color="secondary">
                        <ShoppingCart />
                      </Badge>
                    </IconButton>
                  </Grid>
                  <Grid item style={{color: "inherit"}}>
                     <Typography color="inherit" >
                      credit: {credit}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button  onClick={handleLogout} color="inherit">
                      Logout
                    </Button>
                  </Grid>
                </>
                ) : (
                  <>
                    <Grid item xs />
                    <Grid item>
                      <Button item container onClick={handleLinkClick('signup')} color="inherit">
                        Sign up
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button item container onClick={handleLinkClick('login')} color="inherit">
                        Login
                      </Button>
                    </Grid>
                </>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
    );
}