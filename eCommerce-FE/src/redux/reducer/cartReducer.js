import { CART_ADD_ITEM, CARD_DELETE_ITEM } from "../actionType/cartTypes";

const initalState = {
  cartItem: localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [],
};
const cartReducer = (state = initalState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      // check if item already exist in the cart
      const existItem = state.cartItem.find((x) => x.product == item.product);
      if (existItem) {
        return {
          ...state,
          cartItem: state.cartItem.map((x) =>
            x.product == existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItem: [...state.cartItem, item],
        };
      }
    case CARD_DELETE_ITEM:
      return {
        ...state,
        cartItem: state.cartItem.filter((x) => x.product != action.payload),
      };
    default:
      return state;
  }
};
export default cartReducer;
