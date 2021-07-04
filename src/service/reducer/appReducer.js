import { handleActions } from "redux-actions";
import { clearToken, setCat, setToken, setUserId, setCredit, setWholePrice } from "../action/appAction";

const initialState = {
  token: null,
  isLoggedIn: false,
  wholePrice: 0,
};

export default handleActions({
  [setToken]: (state, action) => ({
    ...state,
    token: action.payload.token,
    isLoggedIn: true,
  }),
  [clearToken]: (state, action) => ({
    ...state,
    token: null,
    isLoggedIn: false,
  }),
  [setUserId]: (state, action) => ({
    ...state,
    userId: action.payload.userId,
    userRole: action.payload.role,
  }),
  [setCat]: (state, action) => ({
    ...state,
    catMen: action.payload.catMen,
    catWomen: action.payload.catWomen,
    catKids: action.payload.catKids,
  }),
  [setCredit]: (state, action) => ({
    ...state,
    credit: action.payload.credit,
  }),
}, initialState);