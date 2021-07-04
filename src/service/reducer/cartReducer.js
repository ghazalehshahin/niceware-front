import { handleActions } from "redux-actions";
import { addItemToCart, clearCart, removeItemFromCart, setCartItems } from "../action/cartAction";

const initialState = {
  items: [],
};

export default handleActions({
  [setCartItems]: (state, action) => ({
    ...state,
    items: action.payload,
  }),
  [addItemToCart]: (state, action) => ({
    ...state,
    items: [...state.items, action.payload],
  }),
  [removeItemFromCart]: (state, action) => ({
    ...state,
    items: state.items.filter(item => item.orderId !== action.payload),
  }),
  [clearCart]: (state, action) => ({
    ...state,
    items: [],
  }),
}, initialState);