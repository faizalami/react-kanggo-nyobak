import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { m } from './utilities';

const container = css`
  width: 100%;
  max-width: 80rem;
  ${m.aAuto}
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
    display: ${props.inline ? 'inline-flex' : 'flex'};
    ${props.container ? container : null}
  `);
  appliedComponent.defaultProps = { ...defaultProps };
  return appliedComponent;
}

export const Flex = applyFlexTo('div');

export const Grid = applyGridTo('div');
