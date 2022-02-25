import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { margin } from './utilities';

const container = css`
  width: 100%;
  max-width: 80rem;
  ${margin.aAuto}
`;

export function applyFlexTo (component, defaultProps) {
  const appliedComponent = styled(component)(props => css`
    display: ${props.inline ? 'inline-flex' : 'flex'};
    flex-direction: ${props.column ? 'column' : 'row'};
    flex-wrap: ${props.wrap === false ? 'nowrap' : 'wrap'};
    ${props.justifyContent ? `justify-content: ${props.justifyContent};` : null}
    ${props.justifyItems ? `justify-items: ${props.justifyItems};` : null}
    ${props.alignContent ? `align-content: ${props.alignContent};` : null}
    ${props.alignItems ? `align-items: ${props.alignItems};` : null}
    ${props.container ? container : null}
  `);
  appliedComponent.defaultProps = { ...defaultProps };
  return appliedComponent;
}

export function applyGridTo (component, defaultProps) {
  const appliedComponent = styled(component)(props => css`
    display: ${props.inline ? 'inline-grid' : 'grid'};
    ${props.cols ? `grid-template-columns: repeat(${props.cols}, minmax(0, 1fr));` : null}
    ${props.rows ? `grid-template-rows: repeat(${props.cols}, minmax(0, 1fr));` : null}
    ${props.gap ? `gap: ${props.gap * 0.25}rem;` : null}
    ${props.container ? container : null}
  `);
  appliedComponent.defaultProps = { ...defaultProps };
  return appliedComponent;
}

export const Flex = applyFlexTo('div');

export const Grid = applyGridTo('div');
