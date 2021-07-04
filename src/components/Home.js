import { TextField, Button, Typography, Grid, makeStyles, Toolbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import 'react-slideshow-image/dist/styles.css';
import AliceCarousel, { Classnames } from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from '../images/1.JPG';
import image2 from '../images/2.JPG';
import image3 from '../images/3.JPG';
import MediaCard from './MediaCard';
import RecipeReviewCard from './RecipeReviewCard';

const useStyles = makeStyles(theme => ({
  homeContainer: {
      margin: theme.spacing(2, 2),
  }, 
  flex: {
    display: 'flex',
    justifyContent: 'space-around',
  }, 
  image: {
    width: 600,
    // height: 400,
    margin: '0 auto'
  }
}))

export default function Home({}) {
  const classes = useStyles();

  const imageItems = [
    <img src={image1} className="sliderimg"/>,
    <img src={image2} className="sliderimg"/>,
    <img src={image3} className="sliderimg"/>,
  ]

  return (
    <div className={classes.homeContainer}>
      <Toolbar />
      <div className={classes.image}>
        <AliceCarousel autoPlay autoPlayInterval="3000" items={imageItems}/>
      </div>
      <h1>Category</h1>
      <div className={classes.flex}>
        <MediaCard image = {image1} title='Women'></MediaCard>
        <MediaCard image = {image2} title='Men'></MediaCard>
        <MediaCard image = {image3} title='Kids'></MediaCard>
      </div>
      <h1>Sale</h1>
      <div className={classes.flex}>
        <MediaCard image = {image1} title='Tshirt1'></MediaCard>
        <MediaCard image = {image2} title='Pants2'></MediaCard>
        <MediaCard image = {image3} title='Shoes'></MediaCard>
      </div>
    </div>
  );
}