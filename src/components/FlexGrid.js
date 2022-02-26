import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { margin } from './utilities';
import mediaQueries from './media-queries';

const container = css`
  max-width: 80rem;
  ${margin.x4}
  ${{
    [mediaQueries.lg]: margin.xAuto,
  }}
`;

const validMediaQuery = key => Object.keys(mediaQueries).includes(key);

function generateResponsive (props, generatorFuntion) {
  if (Object.keys(props).some(validMediaQuery)) {
    return Object.keys(mediaQueries).reduce((styles, media) => {
      if (props[media]) {
        return {
          ...styles,
          [mediaQueries[media]]: css`${generatorFuntion(props[media])}`,
        };
      }
      return styles;
    }, {});
  }
  return null;
}

function generateFlexProps (props) {
  return css`
    ${props.justifyContent ? `justify-content: ${props.justifyContent};` : null}
    ${props.justifyItems ? `justify-items: ${props.justifyItems};` : null}
    ${props.alignContent ? `align-content: ${props.alignContent};` : null}
    ${props.alignItems ? `align-items: ${props.alignItems};` : null}
    ${props.container ? container : null}
  `;
}

export function applyFlexTo (component, defaultProps) {
  const appliedComponent = styled(component)(props => css`
    display: ${props.inline ? 'inline-flex' : 'flex'};
    flex-direction: ${props.column ? 'column' : 'row'};
    flex-wrap: ${props.wrap === false ? 'nowrap' : 'wrap'};
    ${generateFlexProps(props)}

    ${generateResponsive(props, generateFlexProps)}
  `);
  appliedComponent.defaultProps = { ...defaultProps };
  return appliedComponent;
}

export const Flex = applyFlexTo('div');

function generateGridProps (props) {
  return css`
    ${props.cols ? `grid-template-columns: repeat(${props.cols}, minmax(0, 1fr));` : null}
    ${props.rows ? `grid-template-rows: repeat(${props.cols}, minmax(0, 1fr));` : null}
    ${props.gap && props.gap <= 8 ? `gap: ${props.gap * 0.25}rem;` : null}
    ${props.container ? container : null}
  `;
}

export function applyGridTo (component, defaultProps) {
  const appliedComponent = styled(component)(props => css`
    display: ${props.inline ? 'inline-grid' : 'grid'};
    ${generateGridProps(props)}

    ${generateResponsive(props, generateGridProps)}
  `);
  appliedComponent.defaultProps = { ...defaultProps };
  return appliedComponent;
}

export const Grid = applyGridTo('div');
