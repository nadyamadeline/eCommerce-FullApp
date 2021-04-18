import { combineReducers } from "redux";
import productReducer from "./productReducer";
import productDetailReducer from "./productDetailReducer";
import cartReducer from "./cartReducer";
import {
  loginReducer,
  registerReducer,
  userDetailReducer,
  updateProfileReducer,
} from "./userReducer";
import {
  createOrderReducer,
  orderDetailReducer,
  orderPayReducer,
  userOrdersReducer,
} from "./orderReducer";
import {
  createProductReducer,
  updateProductReducer,
  deleteProductReducer,
  orderListReducer,
  deleteOrderReducer,
  orderDeliverReducer,
  userListReducer,
  deleteUserReducer,
  createAdminReducer,
} from "./adminReducer";

const rootReducer = combineReducers({
  productReducer,
  productDetailReducer,
  cart: cartReducer,
  login: loginReducer,
  register: registerReducer,
  order: createOrderReducer,
  detailOrder: orderDetailReducer,
  payReducer: orderPayReducer,
  userOrders: userOrdersReducer,
  userDetail: userDetailReducer,
  updateProfile: updateProfileReducer,
  createProduct: createProductReducer,
  updateProduct: updateProductReducer,
  deleteProduct: deleteProductReducer,
  orderList: orderListReducer,
  deleteOrder: deleteOrderReducer,
  deliverOrder: orderDeliverReducer,
  userList: userListReducer,
  deleteUser: deleteUserReducer,
  createAdmin: createAdminReducer,
});

export default rootReducer;
