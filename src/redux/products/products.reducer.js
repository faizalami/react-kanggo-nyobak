import { SET_PRODUCT_DATA } from './products.types';

const initialState = {
  data: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_DATA:
      return {
        ...state,
        data: [...action.payload],
      };
    default:
      return state;
  }
};

export default productsReducer;
