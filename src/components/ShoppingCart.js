import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShoppingCartApi, purchaseOrderApi, submitOrderApi, createAddress, createPhone,getAddress ,getPhone } from '../service/api/shoppingApi';
import { getproductApi } from '../service/api/productApi';
import { Button, Card, Grid, IconButton, makeStyles, Step, StepLabel, Stepper, TextField, Toolbar, Typography } from '@material-ui/core';
import { Add, Delete, PlusOne, Remove } from '@material-ui/icons';
import ShoppingCartItem from './ShoppingCartItem';
import { useSnackbar } from 'notistack';
import { setWholePrice } from '../service/action/appAction';

const useStyles = makeStyles((theme) => ({
    shoppingCartContainer: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartItemContainer: {
        width: '100%'
    },
    purchaseButton: {
        width: 200,
        margin: theme.spacing(2, 1)
    },
    itemCard: {
        margin: theme.spacing(0, 2),
        padding: theme.spacing(0, 2),
    },
    emptyContainer: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    stepper: {
        width: 400
    },
    infoFormContainer: {
        width: 400
    },
    wholeprice: {
        width: 200,
        margin: theme.spacing(2, 1)
    }
}));

function calPrice(items, sum) {
    const wprice = items.map((item) =>
      sum += item.product.price * item.count
    );
    return (
      sum
    );
  }
export default function ShoppingCart() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [step, setStep] = useState(0);
    const cartProducts = useSelector(state => state.cart.items);
    const [wholePrice, setWholePrice] = useState(0);
    const userId = useSelector(state => state.app.userId);
    const { enqueueSnackbar } = useSnackbar();
    const [address, setAddress] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [phonenumbers, setPhononeNumbers] = useState([]);
    const [adds, setAdds] = useState([]);
    const [postalCode, setPostalCode] = useState('');

    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
    }
    const handleChangePhoneNum = (e) => {
        setPhoneNum(e.target.value);
    }
    const handleChangePostalCode = (e) => {
        setPostalCode(e.target.value);
    }

    const items = cartProducts.reduce((acc, val) => {
        const pv = acc.findIndex(p => p?.product?.id === val.id);
        if(pv >= 0) {
            acc[pv].count = acc[pv].count + 1;
        } else {
            acc.push({
                product: val,
                count: 1,
            })
        }
        return acc;
    }, []);

    const handleSubmitAddress = async () =>{
        console.log(userId, address);
        const response = await createAddress(address, parseInt(userId));
        console.log(response)
        setAddress(response.about);
    }
    const handleSubmitPhone = async () =>{
        const response = await createPhone(phoneNum, parseInt(userId));
        setPhoneNum(response.id);

    }
    // const handlePchange=(id) => {
    //     setPhoneNum(id);
    // }
    const handleGoToInfo = () => {
        setStep(1);
    }
    const handleGoBack = () => {
        setStep(0);
    }
    const handlePurchase = async () => {
        const recieve = "2022 12 20 19:40:10.100000";
        const x = cartProducts?.map(cp => (cp?.orderId));
        console.log(x)
        try {
            setAddress(1);
            setPhoneNum(1);
            const mainOrder = await submitOrderApi(parseInt(userId), address,phoneNum,recieve,  x);
            await purchaseOrderApi(mainOrder.id);
            enqueueSnackbar('Your purchase has been successful.', {variant: 'success'});
        } catch(e) {
            console.log(e);
            enqueueSnackbar('Your purchase has failed.', {variant: 'error'});
        } finally {
            setAddress('');
            setPhoneNum('');
            setPostalCode('');
        }
    }
    useEffect(() => {
        const fetch = async () => {
            try {
            const ps = await getPhone(userId);
            // console.log(ps);
            setPhononeNumbers(ps);
            const adds = await getAddress(userId);
            setAdds(adds);
            } catch(e) {
            }
        };
        fetch();
        }, [userId]);
    return (
        <>
            <Toolbar />
            {items?.length > 0
                ? (
                <div className={classes.shoppingCartContainer}>
                    <Stepper className={classes.stepper} activeStep={step}>
                        <Step>
                            <StepLabel>Products</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Information</StepLabel>
                        </Step>
                    </Stepper>
                    {
                        step === 0 
                        ? (
                        <div className={classes.cartItemContainer}>
                            <Grid container spacing={4}>
                                {items.map(item => (
                                    <Grid item xs={12}>
                                        <ShoppingCartItem product={item.product} count={item.count} />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                        ) : (
                            <div className={classes.infoFormContainer}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">Please enter the receiver info.</Typography>
                                    </Grid>
                                    <Grid container spacing={4}>
                                {phonenumbers.map(pn => (
                                    <Grid item xs={12}>
                                        <Button onClick={handleChangePhoneNum}>
                                            {pn.phone}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                            label="Phone number"
                                            onChange={handleChangePhoneNum}
                                            value={phoneNum}
                                            variant="outlined"
                                            fullWidth
                                            // size="small"
                                            margin="normal"
                                        />
                                        <Button onClick={handleSubmitPhone}>
                                            Add 
                                        </Button>
                                    </Grid>
                                    <Grid container spacing={4}>
                                {adds.map(add => (
                                    <Grid item xs={12}>
                                        <Button onClick={handleChangeAddress}>
                                            {add.about}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                            label="Address"
                                            onChange={handleChangeAddress}
                                            value={address}
                                            variant="outlined"
                                            fullWidth
                                            // size="small"
                                            margin="normal"
                                        />
                                        <Button onClick={handleSubmitAddress}>
                                            Add 
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                            label="Postal code"
                                            onChange={handleChangePostalCode}
                                            value={postalCode}
                                            variant="outlined"
                                            fullWidth
                                            // size="small"
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        )
                    }
                    {
                        step === 0 ? (
                            <div>
                                <Grid>
                                <Typography className={classes.wholeprice} >
                                    Whole Price: {calPrice(items, 0)}$
                                    </Typography>
                                <Button 
                                    onClick={handleGoToInfo}
                                    className={classes.purchaseButton} 
                                    variant="outlined" 
                                    color="primary"
                                >enter info</Button>
                                </Grid>
                                 {/* <Grid item xs={12} className={classes.infoFormContainer}>
                                    
                                </Grid> */}   
                            </div>
                        ) : (
                            <div>
                                 <Grid item xs={12} className={classes.infoFormContainer}>
                                    <Typography>
                                    Whole Price: {calPrice(items, 0)}$
                                    </Typography>
                                </Grid>
                                <Button 
                                    onClick={handleGoBack}
                                    className={classes.purchaseButton} 
                                    variant="outlined" 
                                    color="primary"
                                >back</Button>
                                <Button 
                                    onClick={handlePurchase}
                                    className={classes.purchaseButton} 
                                    variant="contained" 
                                    color="primary"
                                >purchase</Button>
                            </div>
                        )
                    }
                </div>
                ) : (
                    <div className={classes.emptyContainer}>
                        <Typography variant="h4">No products added.</Typography>
                    </div>
                )}
        </>
    )
}