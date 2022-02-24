import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { dark, lightGray, gray, darkGray, indigo, darkIndigo, red, darkRed } from './variables';
import { Link } from 'react-router-dom';

const buttonVariants = (variant) => {
  switch (variant) {
    case 'outline':
      return css`
        color: ${darkGray};
        background-color: transparent;
        border: 1px solid ${gray};
        
        &:hover, &:focus {
          background-color: ${lightGray};
        }
      `
    case 'link':
      return css`
        color: ${indigo};
        background-color: transparent;
        border: 1px solid transparent;
      `
    case 'dark':
      return css`
        color: white;
        background-color: ${dark};
        border: 1px solid transparent;
      `
    case 'danger':
      return css`
        color: white;
        background-color: ${red};
        border: 1px solid transparent;
        
        &:hover, &:focus {
          background-color: ${darkRed};
        }
      `
    default:
      return css`
        color: white;
        background-color: ${indigo};
        border: 1px solid transparent;
        
        &:hover, &:focus {
          background-color: ${darkIndigo};
        }
      `
  }
};

const baseButton = (props) => css`
  display: inline-flex;
  justify-content: center;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  ${buttonVariants(props.variant)}
`;

const circleButton = () => css`
  border-radius: 50%;
  padding: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  line-height: 1.5rem;
`;

export const Button = styled.button`
  ${baseButton}
`;

export const ButtonLink = styled(Link)`
  ${baseButton}
`

export const CircleButton = styled(Button)`
  ${circleButton}
`

export const CircleButtonLink = styled(ButtonLink)`
  ${circleButton}
`
