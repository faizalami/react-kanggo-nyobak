import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { setupServer } from 'msw/node';
import configureStore from './redux/store';
import { productListAPI } from './test-utils/mocks/product';

const store = configureStore();

test('App matches snapshot', async () => {
  const server = setupServer(productListAPI);
  server.listen();
  expect(render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <App/>
      </MemoryRouter>
    </Provider>,
  )).toMatchSnapshot();
  server.close();
});
