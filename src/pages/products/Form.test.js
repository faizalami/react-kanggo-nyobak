import configureStore from '../../redux/store';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { productCreateAPI, productDetailAPI, productDetailDummy, productEditAPI } from '../../test-utils/mocks/product';
import Form from './Form';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

function TestForm ({ path }) {
  const store = configureStore({
    products: {
      data: [],
      detail: { ...productDetailDummy[0] },
      error: false,
    },
  });

  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/product/add" element={<Form/>}/>
          <Route path="/product/edit/:id" element={<Form/>}/>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

function fireAllInputEvents (valid = true) {
  const nameInput = screen.getByLabelText('Name');
  const priceInput = screen.getByLabelText('Price');
  const categoryInput = screen.getByLabelText('Category');
  const stockInput = screen.getByLabelText('Stock');
  const descriptionInput = screen.getByLabelText('Description');
  const pictureInput = screen.getByLabelText(/Picture$/);

  fireEvent.change(nameInput, { target: { value: valid ? 'Test Form' : '' } });
  fireEvent.change(priceInput, { target: { value: '' } });
  fireEvent.change(categoryInput, { target: { value: '' } });
  fireEvent.change(stockInput, { target: { value: '' } });
  fireEvent.change(descriptionInput, { target: { value: '' } });
  fireEvent.change(pictureInput, {
    target: {
      files: valid ? [
        new File(['test image'], 'test.png', { type: 'image/png' }),
      ] : [],
    },
  });
}

describe('Test Create & Edit Page', () => {
  const server = setupServer(productCreateAPI, productEditAPI, productDetailAPI);
  beforeAll(() => server.listen());
  afterEach(() => server.restoreHandlers());
  afterAll(() => server.close());

  test('create product', async () => {
    render(<TestForm path="/product/add"/>);
    fireAllInputEvents();

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/product/1');
    });
  });

  test('edit product', async () => {
    render(<TestForm path="/product/edit/1"/>);
    fireAllInputEvents();

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/product/1');
    });
  });

  test('reset form', () => {
    render(<TestForm path="/product/edit/1"/>);
    fireAllInputEvents();

    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.getByLabelText('Name').value).toBe(productDetailDummy[0].name);
  });

  test('create invalid product', async () => {
    render(<TestForm path="/product/add"/>);
    fireAllInputEvents(false);

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(screen.getByText('Failed to save product')).toBeInTheDocument();
    });
  });

  test('edit non-existent product', async () => {
    render(<TestForm path="/product/edit/3"/>);

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/404');
    });
  });
});
