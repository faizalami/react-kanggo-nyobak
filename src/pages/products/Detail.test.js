import configureStore from '../../redux/store';
import { rest } from 'msw';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { setupServer } from 'msw/node';
import Detail from './Detail';

const productDummy = Array(2).fill().map((item, index) => ({
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

const detailMock = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/products/2`, (req, res, ctx) => {
    return res(ctx.json(productDummy[1]));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/products/3`, (req, res, ctx) => {
    return res(ctx.status(404));
  }),
];

function DummyNotFound () {
  return (<div>404</div>);
}

function TestDetail ({ id }) {
  const store = configureStore({
    products: {
      data: [
        productDummy[0],
      ],
      detail: null,
      error: false,
    },
  });

  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/product/${id}`]}>
        <Routes>
          <Route path="/product/:id" element={<Detail/>}/>
          <Route
            path="/404"
            element={<DummyNotFound/>}
          />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe('Test Detail Page', () => {
  const server = setupServer(...detailMock);
  beforeAll(() => server.listen());
  afterEach(() => server.restoreHandlers());
  afterAll(() => server.close());

  test('display correct detail', async () => {
    render(<TestDetail id={1}/>);
    const exist = await screen.findByText('Test 1');
    expect(exist).toBeInTheDocument();
  });

  test('display correct detail when the id doesn\'t exist in store but exist in server', async () => {
    render(<TestDetail id={2}/>);
    const exist = await screen.findByText('Test 2');
    expect(exist).toBeInTheDocument();
  });

  test('display correct detail when the id doesn\'t exist both in store and in server', async () => {
    render(<TestDetail id={3}/>);
    const exist = await screen.findByText('404');
    expect(exist).toBeInTheDocument();
  });
});
