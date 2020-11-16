import React, { useReducer } from "react";
import { productReducer } from "./productReducer";
import axios from "axios";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_REVIEW_SUCCESS,
  PRODUCT_DELETE_REVIEW_FAIL,
  PRODUCT_DELETE_REVIEW_REQUEST,
} from "../constants/productConstants";

export const ProductContext = React.createContext();

const ProductState = ({ children }) => {
  const initialState = {
    products: [],
    product: { reviews: [] },
    topProducts: [],
  };
  const [state, dispatch] = useReducer(productReducer, initialState);

  const listProducts = async (
    keyword = "",
    pageNumber = "",
    price = "",
    category = "",
    sort = ""
  ) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}&minPrice=${price[0]}&maxPrice=${price[1]}&category=${category}&sort=${sort}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  const listProductDetails = async (id) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const deleteProduct = async (id) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST });
      const mytoken =
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          Authorization: `Bearer ${mytoken}`,
        },
      };
      await axios.delete(`/api/products/${id}`, config);
      dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const createProduct = async () => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });
      const mytoken =
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          Authorization: `Bearer ${mytoken}`,
        },
      };
      const { data } = await axios.post(`/api/products`, {}, config);
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  const updateProduct = async (product) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
      const mytoken =
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          Authorization: `Bearer ${mytoken}`,
        },
      };
      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
      );
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const productCreateReset = () => {
    dispatch({ type: PRODUCT_CREATE_RESET });
  };

  const createReview = async (id, review) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
      const mytoken =
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          Authorization: `Bearer ${mytoken}`,
        },
      };
      const { data } = await axios.post(
        `/api/products/${id}/review`,
        review,
        config
      );
      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const deleteReview = async (id, reviewid) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REVIEW_REQUEST });
      const mytoken =
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          Authorization: `Bearer ${mytoken}`,
        },
      };
      const { data } = await axios.put(
        `/api/products/${id}/deletereview`,
        { reviewid },
        config
      );
      dispatch({ type: PRODUCT_DELETE_REVIEW_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  const listTopProducts = async () => {
    try {
      dispatch({ type: PRODUCT_TOP_REQUEST });
      const { data } = await axios.get(`/api/products/top/list`);

      dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_TOP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  return (
    <ProductContext.Provider
      value={{
        createReview,
        deleteReview,
        updateProduct,
        createProduct,
        deleteProduct,
        listProducts,
        listTopProducts,
        productCreateReset,
        products: state.products,
        topProducts: state.topProducts,
        error: state.error,
        pages: state.pages,
        page: state.page,
        loading: state.loading,
        loadingtop: state.loadingtop,
        product: state.product,
        listProductDetails,
        success: state.success,
        successDelete: state.successDelete,
        maxprice: state.maxprice,
        minprice: state.minprice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductState;
