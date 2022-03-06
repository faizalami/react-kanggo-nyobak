import { rest } from 'msw';

export const productListDummy = Array(10).fill().map((item, index) => ({
  id: index + 1,
  name: `Test ${index + 1}`,
  picture: index < 5 ? null : {
    url: `test-${index}.jpg`,
  },
  price: '',
}));

export const productListAPI = rest.get(`${process.env.REACT_APP_API_BASE_URL}/products`, (req, res, ctx) => {
  return res(ctx.json([...productListDummy]));
});

export const productDetailDummy = Array(2).fill().map((item, index) => ({
  id: index + 1,
  name: `Test ${index + 1}`,
  picture: index ? null : {
    url: `test-${index}.jpg`,
  },
  description: '',
  price: '',
  stock: '',
  category: '',
}));

export const productDetailAPI = rest.get(`${process.env.REACT_APP_API_BASE_URL}/products/:id`, (req, res, ctx) => {
  const { id } = req.params;
  if (Number(id) === 3) {
    return res(ctx.status(404));
  }
  return res(ctx.json(productDetailDummy[Number(id) - 1]));
});

const createEditResponse = (req, res, ctx) => {
  const { id } = req.params;
  if (Number(id) === 2) {
    return res(ctx.status(400));
  }
  const reqBody = req.body;
  const body = JSON.parse(reqBody.get('data'));
  const file = reqBody.get('files[picture]');
  const picture = file ? { url: file.name } : null;

  const response = {
    ...body,
    id: Number(id) || 1,
    picture,
  };

  if (Object.values(body).every(item => item === '')) {
    return res(ctx.status(400));
  }
  return res(ctx.json(response));
};

export const productCreateAPI = rest.post(`${process.env.REACT_APP_API_BASE_URL}/products`, createEditResponse);
export const productEditAPI = rest.put(`${process.env.REACT_APP_API_BASE_URL}/products/:id`, createEditResponse);

export const productDeleteAPI = rest.delete(`${process.env.REACT_APP_API_BASE_URL}/products/:id`, (req, res, ctx) => {
  const { id } = req.params;
  if (Number(id) === 2) {
    return res(ctx.status(400));
  }
  return res(ctx.json({ id: Number(id) }));
});
