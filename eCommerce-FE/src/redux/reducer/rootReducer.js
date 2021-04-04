import { combineReducers } from "redux";
import productReducer from "./productReducer";
import productDetailReducer from "./productDetailReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  productReducer,
  productDetailReducer,
  cart: cartReducer,
});

export default rootReducer;
