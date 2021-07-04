import { combineReducers } from "redux";
import appReducer from "./appReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  app: appReducer,
  cart: cartReducer,
});