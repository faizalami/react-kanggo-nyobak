import { SET_PRODUCT_DATA, SET_PRODUCT_DETAIL, SET_PRODUCT_ERROR } from './products.types';
import axios from '../../plugins/axios';

export const setProductData = data => {
  return {
    type: SET_PRODUCT_DATA,
    payload: data,
  };
};

export const setProductDetail = detail => {
  return {
    type: SET_PRODUCT_DETAIL,
    payload: detail,
  };
};

export const setProductError = (error) => {
  return {
    type: SET_PRODUCT_ERROR,
    payload: error,
  };
};

export const loadProductData = () => {
  return async dispatch => {
    try {
      dispatch(setProductError(false));
      const { data } = await axios.get('/products');

      dispatch(setProductData(data));
    } catch (error) {
      dispatch(setProductData([]));
      dispatch(setProductError(true));
      console.error(error);
    }
  };
};

export const loadProductDetail = (id) => {
  return async dispatch => {
    try {
      dispatch(setProductError(false));
      const { data } = await axios.get(`/products/${id}`);

      dispatch(setProductDetail(data));
    } catch (error) {
      dispatch(setProductDetail(null));
      dispatch(setProductError(true));
      console.error(error);
    }
  };
};
