const {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} = require("../constants/cartConstants");

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existitem = state.cartItems.find((c) => c.product === item.product);
      if (existitem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existitem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
