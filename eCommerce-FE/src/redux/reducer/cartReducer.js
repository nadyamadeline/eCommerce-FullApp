import {
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  SAVE_SHIPPING_INFO,
  SAVE_PAYMENT_METHOD,
} from "../actionType/cartTypes";

const initalState = {
  cartItem: localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
  paymentMethod: "PayPal",
};
const cartReducer = (state = initalState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      // check if item already exist in the cart
      const existItem = state.cartItem.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItem: state.cartItem.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItem: [...state.cartItem, item],
        };
      }
    case CART_DELETE_ITEM:
      return {
        ...state,
        cartItem: state.cartItem.filter((x) => x.product !== action.payload),
      };
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
export default cartReducer;
