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
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_DELETE_REVIEW_SUCCESS,
  PRODUCT_DELETE_REVIEW_FAIL,
  PRODUCT_DELETE_REVIEW_REQUEST,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_CREATE_RESET,
} from "../constants/productConstants";

export const productReducer = (state, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        products: [],
        success: false,
        successDelete: false,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        maxprice: action.payload.price.maxprice,
        minprice: action.payload.price.minprice,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, successDelete: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload, successDelete: false };
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true, success: null };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {
        ...state,
        product: { reviews: [] },
        success: false,
        successDelete: false,
      };
    case PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        product: action.payload,
        success: true,
        loading: false,
      };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { ...state, product: {}, success: false, successDelete: false };
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DELETE_REVIEW_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        successDelete: true,
        loading: false,
      };
    case PRODUCT_DELETE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_TOP_REQUEST:
      return { ...state, loadingtop: true, topProducts: [] };
    case PRODUCT_TOP_SUCCESS:
      return {
        ...state,
        topProducts: action.payload,
        loadingtop: false,
      };
    case PRODUCT_TOP_FAIL:
      return { loadingtop: false, error: action.payload };
    default:
      return state;
  }
};
