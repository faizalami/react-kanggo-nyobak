import productsReducer, { initialState } from './products.reducer';
import { productDetailDummy, productListDummy } from '../../test-utils/mocks/product';
import { DELETE_PRODUCT, SET_PRODUCT_DATA, SET_PRODUCT_DETAIL, SET_PRODUCT_ERROR } from './products.types';

describe('Test product reducer', () => {
  test('initial state', () => {
    expect(productsReducer(initialState, {})).toEqual(initialState);
  });

  test('set product data', () => {
    const expectedState = {
      ...initialState,
      data: [...productListDummy],
    };
    expect(productsReducer(initialState, {
      type: SET_PRODUCT_DATA,
      payload: [...productListDummy],
    })).toEqual(expectedState);
  });

  test('set detail', () => {
    const expectedState = {
      ...initialState,
      detail: { ...productDetailDummy[0] },
    };
    expect(productsReducer(initialState, {
      type: SET_PRODUCT_DETAIL,
      payload: { ...productDetailDummy[0] },
    })).toEqual(expectedState);
  });

  test('delete from data', () => {
    const stateBeforeDelete = {
      ...initialState,
      data: [...productListDummy],
    };
    const expectedState = {
      ...initialState,
      data: productListDummy.slice(1),
    };
    expect(productsReducer(stateBeforeDelete, {
      type: DELETE_PRODUCT,
      payload: productListDummy[0].id,
    })).toEqual(expectedState);
  });

  test('set error', () => {
    const expectedState = {
      ...initialState,
      error: true,
    };
    expect(productsReducer(initialState, {
      type: SET_PRODUCT_ERROR,
      payload: true,
    })).toEqual(expectedState);
  });
});
