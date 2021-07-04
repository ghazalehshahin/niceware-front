import { createAction } from "redux-actions";

export const setCartItems = createAction('CART_SET_ALL');

export const addItemToCart = createAction('CART_ADD_ITEM');

export const removeItemFromCart = createAction('CART_REMOVE_ITEM');

export const clearCart = createAction('CART_CLEAR');
