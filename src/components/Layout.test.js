import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';

test('Layout matches snapshot', () => {
  expect(render(
    <MemoryRouter>
      <Layout/>
    </MemoryRouter>,
  )).toMatchSnapshot();
});
