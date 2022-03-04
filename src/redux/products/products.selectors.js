import { createSelector } from 'reselect';

export const selectProducts = state => state.products;

export const selectData = createSelector(
  [selectProducts],
  products => products.data,
);
