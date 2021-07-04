import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderApi, deleteOrderApi, getShoppingCartApi } from '../service/api/shoppingApi';
import { getproductApi } from '../service/api/productApi';
import { Button, Card, Grid, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Add, Delete, PlusOne, Remove } from '@material-ui/icons';
import { addItemToCart, removeItemFromCart } from '../service/action/cartAction';
import { setWholePrice } from '../service/action/appAction';

const useStyles = makeStyles((theme) => ({
    cartContianer: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemCard: {
        margin: theme.spacing(0, 2),
        padding: theme.spacing(0, 2),
    }
}));

export default function ShoppingCartItem({product, count}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    var wholePrice = useSelector(state => state.app.wholePrice);
    const userId = useSelector(state => state.app.userId);
    const [price, setPrice] = useState(product.price);

    const handleAddMore = async () => {
        try {
            const order = await addOrderApi(userId, product.id);
            setPrice(price+product.price);
            // dispatch(setWholePrice(wholePrice + product.price))
            // console.log(wholePrice)
            dispatch(addItemToCart({...product, orderId: order.id}));
        } catch(e) {
    
        }
    }

    const handleRemoveOne = async () => {
        try {
            await deleteOrderApi(product.orderId);
            setPrice(price-product.price);
            // dispatch(setWholePrice(wholePrice - product.price))
            // console.log(wholePrice)
            dispatch(removeItemFromCart(product.orderId));
        } catch(e) {
    
        }
    }
    // useEffect(() => {
    //     console.log(wholePrice)
    //     wholePrice = wholePrice + (product.price*count)
    //     dispatch(setWholePrice(wholePrice + product.price*count))
    //     }, [wholePrice, ]);
    return (
        <Card className={classes.itemCard}>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="body1">{product.name}</Typography>
                </Grid>
                <Grid item xs={1} />
                <Grid item variant="caption">
                    <Typography>{product.subtitle}</Typography>
                </Grid>
                <Grid item xs />
                <Grid item>
                    <Typography>{price} $</Typography>
                </Grid>
                <Grid item xs={1} />
                <Grid item>
                    <IconButton onClick={handleAddMore}>
                        <Add />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography>{count}</Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={handleRemoveOne}>
                        <Remove />
                    </IconButton>
                </Grid>
                <Grid item xs={1} />
                <Grid item>
                    <IconButton>
                        <Delete />
                    </IconButton>
                </Grid>
            </Grid>
        </Card>
    )
}