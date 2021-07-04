import { TextField, Button, Typography, Grid, makeStyles, Toolbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import 'react-slideshow-image/dist/styles.css';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from '../images/1.JPG';
import image2 from '../images/2.JPG';
import image3 from '../images/3.JPG';
import MediaCard from './MediaCard';
import RecipeReviewCard from './RecipeReviewCard';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { getproductlistApi } from '../service/api/productApi';

const useStyles = makeStyles(theme => ({
  productContianer: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
  }
}))

export default function HomePageSellerProducts({}) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
  const fetch = async () => {
      try {
      const womenProductsResult = await getproductlistApi(1);
      const menProductsResult = await getproductlistApi(2);
      const kidsProductsResult = await getproductlistApi(3);
      setProducts([...womenProductsResult, ...menProductsResult, ...kidsProductsResult]);
      } catch(e) {
      }
  };
  fetch();
  }, []);
  return (
      <>
          <Toolbar />
          <div className={classes.productContianer}>
              <Grid container spacing={4}>
                  {products.map(product => (
                      <Grid item lg={4} md={6} xs={12}>
                          <RecipeReviewCard 
                              product={product}
                          />
                      </Grid>
                  ))}
              </Grid>
          </div>
      </>
  );
}