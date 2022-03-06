import { rest } from 'msw';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { setupServer } from 'msw/node';
import configureStore from './redux/store';

const store = configureStore();

const productDummy = Array(10).fill().map((item, index) => ({
  id: index + 1,
  name: `Test ${index + 1}`,
  picture: index < 5 ? null : {
    formats: {
      thumbnail: { url: `test-${index}.jpg` },
    },
  },
  price: 0,
}));

const productMock = rest.get(`${process.env.REACT_APP_API_BASE_URL}/products`, (req, res, ctx) => {
  return res(ctx.json([...productDummy]));
});

describe('Test App', () => {
  let productCards = [];
  test('App matches snapshot', async () => {
    const server = setupServer(productMock);
    server.listen();
    expect(render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App/>
        </MemoryRouter>,
      </Provider>,
    )).toMatchSnapshot();
    productCards = await screen.findAllByTestId('product-card');
    server.close();
  });

  test('index content display correct data', async () => {
    expect(productCards.length).toBe(productDummy.length);
  });
});
