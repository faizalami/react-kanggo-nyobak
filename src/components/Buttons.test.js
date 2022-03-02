import { fireEvent, render, screen } from '@testing-library/react';
import { matchers } from '@emotion/jest';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Button, ButtonLink, CircleButton, CircleButtonLink } from './Buttons';
import { dark, gray, indigo, red } from './variables';

expect.extend(matchers);

describe('Test Regular Buttons', () => {
  test('Regular button with only text as child', () => {
    render(<Button>Test</Button>);
    expect(screen.getByText('Test')).toHaveStyleRule('background-color', indigo);
  });

  test('Render outlined button', () => {
    render(<Button variant="outline">Test</Button>);
    expect(screen.getByText('Test')).toHaveStyleRule('border', `1px solid ${gray}`);
  });

  test('Render link button', () => {
    render(<Button variant="link">Test</Button>);
    expect(screen.getByText('Test')).toHaveStyleRule('background-color', 'transparent');
  });

  test('Render dark button', () => {
    render(<Button variant="dark">Test</Button>);
    expect(screen.getByText('Test')).toHaveStyleRule('background-color', dark);
  });

  test('Render danger button', () => {
    render(<Button variant="danger">Test</Button>);
    expect(screen.getByText('Test')).toHaveStyleRule('background-color', red);
  });
});

describe('Test Other Buttons', () => {
  test('Render circle button', () => {
    render(<CircleButton>Test</CircleButton>);
    expect(screen.getByText('Test')).toHaveStyleRule('border-radius', '50%');
  });

  test('Render router link button', () => {
    let locationPathName = null;

    function DummyRoute () {
      ({ pathname: locationPathName } = useLocation());
      return null;
    }

    render(
      <MemoryRouter initialEntries={['/']}>
        <ButtonLink to="/test1">Link 1</ButtonLink>
        <CircleButtonLink to="/test2">Link 2</CircleButtonLink>

        <Routes>
          <Route
            path="*"
            element={<DummyRoute/>}
          />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Link 1'));
    expect(locationPathName).toBe('/test1');

    fireEvent.click(screen.getByText('Link 2'));
    expect(locationPathName).toBe('/test2');
  });
});
