import { createSelector } from 'reselect';

export const selectProducts = state => state.products;
export const selectProductsError = createSelector(
  [selectProducts],
  products => products.error,
);

export const selectData = createSelector(
  [selectProducts],
  products => products.data,
);

export const selectStoredDetail = createSelector(
  [selectProducts],
  products => products.detail,
);

export const selectDetailById = createSelector(
  [
    selectData,
    selectStoredDetail,
    (state, id) => id,
  ],
  (data, detail, id) => {
    if (detail?.id === Number(id)) {
      return detail;
    }
    return data.find(product => product.id === Number(id));
  },
);
