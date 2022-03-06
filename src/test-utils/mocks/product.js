import { rest } from 'msw';

export const productListDummy = Array(10).fill().map((item, index) => ({
  id: index + 1,
  name: `Test ${index + 1}`,
  picture: index < 5 ? null : {
    url: `test-${index}.jpg`,
  },
  price: 0,
}));

export const productListAPI = rest.get(`${process.env.REACT_APP_API_BASE_URL}/products`, (req, res, ctx) => {
  return res(ctx.json([...productListDummy]));
});

const productDetailDummy = Array(2).fill().map((item, index) => ({
  id: index + 1,
  name: `Test ${index + 1}`,
  picture: index ? null : {
    url: `test-${index}.jpg`,
  },
  description: null,
  price: null,
  stock: null,
  category: null,
}));

export const productDetailAPI = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/products/2`, (req, res, ctx) => {
    return res(ctx.json(productDetailDummy[1]));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/products/3`, (req, res, ctx) => {
    return res(ctx.status(404));
  }),
];

export const productDeleteAPI = rest.delete(`${process.env.REACT_APP_API_BASE_URL}/products/:id`, (req, res, ctx) => {
  const { id } = req.params;
  return res(ctx.json({ id: Number(id) }));
});
