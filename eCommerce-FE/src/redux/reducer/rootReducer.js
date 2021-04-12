import { combineReducers } from "redux";
import productReducer from "./productReducer";
import productDetailReducer from "./productDetailReducer";
import cartReducer from "./cartReducer";
import { loginReducer, registerReducer } from "./loginReducer";
import {
  createOrderReducer,
  orderDetailReducer,
  orderPayReducer,
} from "./orderReducer";

const rootReducer = combineReducers({
  productReducer,
  productDetailReducer,
  cart: cartReducer,
  login: loginReducer,
  register: registerReducer,
  order: createOrderReducer,
  detailOrder: orderDetailReducer,
  payReducer: orderPayReducer,
});

export default rootReducer;
