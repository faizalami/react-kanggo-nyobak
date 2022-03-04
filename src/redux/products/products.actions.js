import { SET_PRODUCT_DATA } from './products.types';
import axios from '../../plugins/axios';

export const setProductData = data => {
  return {
    type: SET_PRODUCT_DATA,
    payload: data,
  };
};

export const loadProductData = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/products');

      dispatch(setProductData(data));
    } catch (error) {
      console.error(error);
    }
  };
};
