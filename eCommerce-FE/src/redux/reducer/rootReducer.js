import { combineReducers } from "redux";
import productReducer from "./productReducer";
import productDetailReducer from "./productDetailReducer";
import cartReducer from "./cartReducer";
import { loginReducer, registerReducer } from "./loginReducer";

const rootReducer = combineReducers({
  productReducer,
  productDetailReducer,
  cart: cartReducer,
  login: loginReducer,
  register: registerReducer,
});

export default rootReducer;
