import React, { useReducer } from "react";
import axios from "axios";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import { orderReducer } from "./orderReducer";

export const OrderContext = React.createContext();

const OrderState = ({ children }) => {
  const initialState = { order: {}, orders: [], loading: true };
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const createOrder = async (order) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST });
      const mytoken =
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          Authorization: `Bearer ${mytoken}`,
        },
      };
      const { data } = await axios.post(`/api/orders`, order, config);
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  const getOrderDetails = async (id) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
      const mytoken =
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          Authorization: `Bearer ${mytoken}`,
        },
      };
      const { data } = await axios.get(`/api/orders/${id}`, config);
      console.log(data);
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const payOrder = async (orderId, paymentResult) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });
      const mytoken =
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mytoken}`,
        },
      };
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      console.log(data);
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  const orderPayReset = () => {
    dispatch({ type: ORDER_PAY_RESET });
  };
  const getOrderList = async () => {
    try {
      dispatch({ type: ORDER_LIST_MY_REQUEST });
      const mytoken =
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          Authorization: `Bearer ${mytoken}`,
        },
      };
      const { data } = await axios.get(`/api/orders/myorder`, config);

      dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_LIST_MY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  const getOrdersList = async () => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });
      const mytoken =
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          Authorization: `Bearer ${mytoken}`,
        },
      };
      const { data } = await axios.get(`/api/orders`, config);

      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  const deliverOrder = async (orderId) => {
    try {
      dispatch({ type: ORDER_DELIVER_REQUEST });
      const mytoken =
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mytoken}`,
        },
      };
      const { data } = await axios.put(
        `/api/orders/${orderId}/deliver`,
        {},
        config
      );

      dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_DELIVER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  return (
    <OrderContext.Provider
      value={{
        createOrder,
        getOrderDetails,
        deliverOrder,
        payOrder,
        orderPayReset,
        getOrderList,
        getOrdersList,
        order: state.order,
        loading: state.loading,
        listloading: state.listloading,
        error: state.error,
        success: state.success,
        orders: state.orders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
