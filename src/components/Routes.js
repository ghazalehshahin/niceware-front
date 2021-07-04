import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Signup from './Signup'
import CreateProduct from './CreateProduct';
import HomePageSellerProducts from './HomePageSellerProducts';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUserId } from '../service/action/appAction';
import ProductList from './ProductList';
import { cats } from '../utils/constants';
import ShoppingCart from './ShoppingCart';
import { getShoppingCartApi } from '../service/api/shoppingApi';
import { addItemToCart, setCartItems } from '../service/action/cartAction';
import { getproductApi } from '../service/api/productApi';


export default function Routes({}) {
  const token = useSelector(state => state.app.token);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const initialLoad = async (userId) => {
      const shoppingCartItemsIds = await getShoppingCartApi(userId);
      const cartItems = [];
      for (const item of shoppingCartItemsIds) {
        const {id: orderId, product: productId} = item;
        const product = await getproductApi(productId);
        cartItems.push({...product, orderId});
      }
      dispatch(setCartItems(cartItems));
    };
    if(!token) {
      const storedUserId = localStorage.getItem('userId');
      const storedUserRole = localStorage.getItem('userRole');
      const storedToken = localStorage.getItem('access_token');
      console.log(storedToken , storedUserId , storedUserRole);
      if(storedToken && storedUserId && storedUserRole) {
        // fetch user data
        dispatch(setToken({ token }));
        dispatch(setUserId({ userId: storedUserId, role: storedUserRole }));
        try {
          initialLoad(storedUserId);
        } catch(e) {
          
        }
      } else {
        // history.push('/login')
      }
    }
    return () => {
      
    };
  }, [dispatch, history, token]);
  return (
    <Switch>
      <Route exact path="/login" render={() => <Login />}/>
      <Route exact path="/signup" render={() => <Signup/>}/>
      <Route exact path="/" render={() => <Home/>}/>     
      <Route exact path="/sellerpage" render={() => <CreateProduct/>}/>     
      <Route exact path="/homeseller" render={() => <HomePageSellerProducts/>}/> 
      {cats.map(cat => (
        <Route exact path={`/${cat.fields.name}`} render={() => <ProductList/>}/>
      ))}  
      <Route exact path="/shopping-cart" render={() => <ShoppingCart/>}/>     
    </Switch>
  );
}
