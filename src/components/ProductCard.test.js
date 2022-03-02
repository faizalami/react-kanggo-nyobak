import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from './ProductCard';

test('ProductCard match with snapshot', () => {
  const dummyProduct = {
    id: 1,
    name: 'Test',
    picture: null,
    price: 20000,
  };

  expect(render(
    <MemoryRouter>
      <ProductCard {...dummyProduct} />
    </MemoryRouter>
  )).toMatchSnapshot();
})
