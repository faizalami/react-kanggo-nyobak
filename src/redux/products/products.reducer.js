import { SET_PRODUCT_DATA, SET_PRODUCT_DETAIL, SET_PRODUCT_ERROR } from './products.types';

const initialState = {
  data: [],
  detail: null,
  error: false,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_DATA:
      return {
        ...state,
        data: [...action.payload],
      };
    case SET_PRODUCT_DETAIL:
      if (action.payload?.id !== state.detail?.id) {
        return {
          ...state,
          detail: { ...action.payload },
        };
      }
      return state;
    case SET_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
