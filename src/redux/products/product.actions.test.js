import configureStore from '../store';
import { setupServer } from 'msw/node';
import {
  productCreateAPI,
  productDeleteAPI,
  productDetailAPI, productDetailDummy,
  productEditAPI,
  productListAPI, productListDummy,
} from '../../test-utils/mocks/product';
import { createProduct, deleteProduct, editProduct, loadProductData, loadProductDetail } from './products.actions';
import { selectData, selectDetailById, selectProductsError, selectStoredDetail } from './products.selectors';
import { waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { initialState } from './products.reducer';
import { serialize } from 'object-to-formdata';

describe('Test Product Actions', () => {
  const server = setupServer(
    productListAPI,
    productDetailAPI,
    productCreateAPI,
    productEditAPI,
    productDeleteAPI,
  );
  beforeAll(() => server.listen());
  afterEach(() => server.restoreHandlers());
  afterAll(() => server.close());

  test('success to load product data', async () => {
    const store = configureStore();
    await store.dispatch(loadProductData());

    await waitFor(() => {
      expect(selectData(store.getState())).toEqual(productListDummy);
    });
  });

  test('failed to load product data', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_API_BASE_URL}/products`, (req, res, ctx) => {
        return res(ctx.status(400));
      }),
    );
    const store = configureStore();
    await store.dispatch(loadProductData());

    await waitFor(() => {
      expect(selectProductsError(store.getState())).toEqual(true);
    });
  });

  test('success to load product detail', async () => {
    const id = productDetailDummy[0].id;
    const store = configureStore();
    await store.dispatch(loadProductDetail(id));

    await waitFor(() => {
      expect(selectDetailById(store.getState(), id)).toEqual(productDetailDummy[0]);
    });
  });

  test('failed to load product detail', async () => {
    const store = configureStore();
    await store.dispatch(loadProductDetail(3));

    await waitFor(() => {
      expect(selectDetailById(store.getState(), 3)).toBeUndefined();
    });
  });

  test('success to create product', async () => {
    const store = configureStore();
    const pictureName = 'test.png';
    const { picture, ...data } = productDetailDummy[0];
    const payload = {
      data: JSON.stringify(data),
      files: {
        picture: new File(['test image'], pictureName, { type: 'image/png' }),
      },
    };

    await store.dispatch(createProduct(serialize(payload)));

    await waitFor(() => {
      expect(selectStoredDetail(store.getState())).toEqual({
        ...data,
        id: 1,
        picture: {
          url: pictureName,
        },
      });
    });
  });

  test('failed to create product', async () => {
    const store = configureStore();
    const { picture, ...data } = productDetailDummy[0];
    const invalidData = Object.keys(data).reduce((obj, key) => {
      return {
        ...obj,
        [key]: '',
      };
    }, {});
    const payload = {
      data: JSON.stringify(invalidData),
      files: {
        picture: null,
      },
    };

    await store.dispatch(createProduct(serialize(payload)));

    await waitFor(() => {
      expect(selectProductsError(store.getState())).toEqual(true);
    });
  });

  test('success to edit product', async () => {
    const store = configureStore();
    const pictureName = 'test.png';
    const { picture, ...data } = productDetailDummy[0];
    const payload = {
      data: JSON.stringify(data),
      files: {
        picture: new File(['test image'], pictureName, { type: 'image/png' }),
      },
    };

    await store.dispatch(editProduct(1, serialize(payload)));

    await waitFor(() => {
      expect(selectStoredDetail(store.getState())).toEqual({
        ...data,
        id: 1,
        picture: {
          url: pictureName,
        },
      });
    });
  });

  test('failed to edit product', async () => {
    const store = configureStore();
    const { picture, ...data } = productDetailDummy[0];
    const invalidData = Object.keys(data).reduce((obj, key) => {
      return {
        ...obj,
        [key]: '',
      };
    }, {});
    const payload = {
      data: JSON.stringify(invalidData),
      files: {
        picture: null,
      },
    };

    await store.dispatch(editProduct(2, serialize(payload)));

    await waitFor(() => {
      expect(selectProductsError(store.getState())).toEqual(true);
    });
  });

  test('success to delete product', async () => {
    const id = productListDummy[0].id;
    const store = configureStore({
      products: {
        data: [...productListDummy],
      },
    });
    await store.dispatch(deleteProduct(id));

    await waitFor(() => {
      expect(selectData(store.getState())).toEqual(productListDummy.slice(1));
    });
  });

  test('failed to delete product', async () => {
    const store = configureStore();
    await store.dispatch(deleteProduct(2));

    await waitFor(() => {
      expect(selectProductsError(store.getState())).toEqual(true);
    });
  });
});

