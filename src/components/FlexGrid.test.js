/** @jsxImportSource @emotion/react */
import { render, screen } from '@testing-library/react';
import { matchers } from '@emotion/jest';
import { applyFlexTo, applyGridTo, Flex, Grid } from './FlexGrid';
import mediaQueries from './media-queries';

expect.extend(matchers);

describe('Test Flex & Grid HOC', () => {
  test('apply flex HOC', () => {
    const FlexApplied = applyFlexTo('div');
    render(<FlexApplied>Test</FlexApplied>);

    expect(screen.getByText('Test')).toHaveStyleRule('display', 'flex');
  });

  test('apply grid HOC', () => {
    const GridApplied = applyGridTo('div');
    render(<GridApplied>Test</GridApplied>);

    expect(screen.getByText('Test')).toHaveStyleRule('display', 'grid');
  });
});

describe('Test Flex & Grid Components', () => {
  test('Flex component with correct props', () => {
    render(
      <Flex
        inline
        column
        wrap="nowrap"
        justifyContent="center"
        justifyItems="center"
        alignContent="center"
        alignItems="center"
      >
        Test
      </Flex>,
    );

    const flexTarget = screen.getByText('Test');
    expect(flexTarget).toHaveStyleRule('display', 'inline-flex');
    expect(flexTarget).toHaveStyleRule('flex-direction', 'column');
    expect(flexTarget).toHaveStyleRule('flex-wrap', 'nowrap');
    [
      'justify-content',
      'justify-items',
      'align-content',
      'align-items',
    ].forEach(property => {
      expect(flexTarget).toHaveStyleRule(property, 'center');
    });
  });

  test('Grid component with correct props', () => {
    render(
      <Grid
        inline
        cols={3}
        rows={2}
        gap={4}
      >
        Test
      </Grid>,
    );

    const gridTarget = screen.getByText('Test');
    expect(gridTarget).toHaveStyleRule('grid-template-columns', 'repeat(3, minmax(0, 1fr))');
    expect(gridTarget).toHaveStyleRule('grid-template-rows', 'repeat(2, minmax(0, 1fr))');
    expect(gridTarget).toHaveStyleRule('gap', '1rem');
  });

  test('using container props', () => {
    render(
      <>
        <Flex container>Flex</Flex>
        <Grid container>Grid</Grid>
      </>,
    );

    [
      screen.getByText('Flex'),
      screen.getByText('Grid'),
    ].forEach(target => {
      expect(target).toHaveStyleRule('margin-left', '1rem');
      expect(target).toHaveStyleRule('margin-right', '1rem');
    });
  });

  test('using responsive props', () => {
    render(
      <>
        <Flex
          justifyContent="center"
          sm={{
            justifyContent: 'flex-start',
          }}
          md={{
            justifyContent: 'flex-end',
          }}
          lg={{
            justifyContent: 'space-between',
          }}
          xl={{
            justifyContent: 'space-around',
          }}
        >
          Flex
        </Flex>
        <Grid
          cols={1}
          sm={{
            cols: 2,
          }}
          md={{
            cols: 3,
          }}
          lg={{
            cols: 4,
          }}
          xl={{
            cols: 5,
          }}
        >
          Grid
        </Grid>
      </>,
    );

    const flexTarget = screen.getByText('Flex');
    expect(flexTarget).toHaveStyleRule('justify-content', 'center');
    const validJustifyValueByIndex = [
      'flex-start',
      'flex-end',
      'space-between',
      'space-around',
    ];

    Object.values(mediaQueries).forEach((query, index) => {
      expect(flexTarget).toHaveStyleRule('justify-content', validJustifyValueByIndex[index], {
        media: query.substring(6),
      });
    });

    const gridTarget = screen.getByText('Grid');
    expect(gridTarget).toHaveStyleRule('grid-template-columns', 'repeat(1, minmax(0, 1fr))');
    Object.values(mediaQueries).forEach((query, index) => {
      expect(gridTarget).toHaveStyleRule('grid-template-columns', `repeat(${index + 2}, minmax(0, 1fr))`, {
        media: query.substring(6),
      });
    });
  });
});
