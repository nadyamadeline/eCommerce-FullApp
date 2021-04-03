import { combineReducers } from "redux";
import productReducer from "./productReducer";
import productDetailReducer from "./productDetailReducer";

const rootReducer = combineReducers({
  productReducer,
  productDetailReducer,
});

export default rootReducer;
