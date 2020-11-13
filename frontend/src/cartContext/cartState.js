import React, { useReducer } from "react";
import { cartReducer } from "./cartReducer";
import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const CartContext = React.createContext();

const CartState = ({ children }) => {
  const shippingInfoFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};
  const cartItemFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  const paymentFromStorage = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : null;
  const initialState = {
    cartItems: cartItemFromStorage,
    shippingAddress: shippingInfoFromStorage,
    paymentMethod: paymentFromStorage,
  };
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = async (id, quantity) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity,
      },
    });

    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  };
  const removeFromCart = (id) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: id });
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  };
  const saveShippingAddress = (data) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };
  const savePaymentMethod = (data) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
    localStorage.setItem("paymentMethod", JSON.stringify(data));
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartItems: state.cartItems,
        removeFromCart,
        saveShippingAddress,
        shippingAddress: state.shippingAddress,
        savePaymentMethod,
        paymentMethod: state.paymentMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
