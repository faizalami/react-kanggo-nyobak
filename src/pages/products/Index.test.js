import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupServer } from 'msw/node';
import configureStore from '../../redux/store';
import { productListDummy, productListAPI, productDeleteAPI } from '../../test-utils/mocks/product';
import Index from './Index';

const store = configureStore();

function TestIndex () {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <Index/>
      </MemoryRouter>
    </Provider>
  );
}

describe('Test Index Page', () => {
  const server = setupServer(productListAPI, productDeleteAPI);
  beforeAll(() => server.listen());
  afterEach(() => server.restoreHandlers());
  afterAll(() => server.close());

  test('load and display correct data', async () => {
    render(<TestIndex/>);
    const productCards = await screen.findAllByTestId('product-card');
    expect(productCards.length).toBe(productListDummy.length);
  });

  test('delete product', async () => {
    render(<TestIndex/>);
    const productToDelete = productListDummy[0];
    const deleteButton = screen.getByLabelText(`Delete ${productToDelete.name}`);

    fireEvent.click(deleteButton);

    await waitFor(() => {
      const productCards = screen.getAllByTestId('product-card');
      expect(productCards.length).toBe(productListDummy.length - 1);
    });
    const deletedProductName = screen.queryByText(productToDelete.name);
    expect(deletedProductName).toBeNull();
  });
});
