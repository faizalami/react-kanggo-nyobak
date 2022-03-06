import configureStore from '../../redux/store';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { setupServer } from 'msw/node';
import Detail from './Detail';
import { productDetailAPI, productDetailDummy } from '../../test-utils/mocks/product';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

function TestDetail ({ id }) {
  const store = configureStore({
    products: {
      data: [
        productDetailDummy[0],
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
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe('Test Detail Page', () => {
  const server = setupServer(productDetailAPI);
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

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/404');
    });
  });
});
