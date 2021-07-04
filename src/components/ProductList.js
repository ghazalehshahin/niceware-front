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
import { useLocation } from 'react-router';
import { cats, subscats } from '../utils/constants';
import { getCommentApi, getproductlistApi } from '../service/api/productApi';

const useStyles = makeStyles(theme => ({
    productContianer: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))

export default function ProductList({}) {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const location = useLocation();

    const cat1Name = location.pathname.split('/')[1];  
    const cat2Name = location.search.split('?subcat=')[1];  

    const cat1 = cats.find(cat => cat.fields.name === cat1Name);
    const cat2 = subscats.find(subcat => subcat.fields.name === cat2Name);

    useEffect(() => {
    const fetch = async () => {
        try {
        const productsResult = await getproductlistApi(cat1?.pk, cat2?.pk);
        setProducts(productsResult);
        } catch(e) {
        }
    };
    fetch();
    }, [cat1, cat2]);
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