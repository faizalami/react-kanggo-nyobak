/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { dark, lightGray, gray, darkGray, indigo, darkIndigo, red, darkRed } from './variables';
import { padding } from './utilities';
import { applyFlexTo } from './FlexGrid';
import { Link } from 'react-router-dom';

function buttonVariants (variant) {
  switch (variant) {
    case 'outline':
      return css`
        color: ${darkGray};
        background-color: white;
        border: 1px solid ${gray};

        &:hover, &:focus {
          background-color: ${lightGray};
        }
      `;
    case 'link':
      return css`
        color: ${indigo};
        background-color: transparent;
        border: 1px solid transparent;
      `;
    case 'dark':
      return css`
        color: white;
        background-color: ${dark};
        border: 1px solid transparent;
      `;
    case 'danger':
      return css`
        color: white;
        background-color: ${red};
        border: 1px solid transparent;

        &:hover, &:focus {
          background-color: ${darkRed};
        }
      `;
    default:
      return css`
        color: white;
        background-color: ${indigo};
        border: 1px solid transparent;

        &:hover, &:focus {
          background-color: ${darkIndigo};
        }
      `;
  }
};

const baseButton = (props) => css`
  border-radius: 0.375rem;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  ${padding.y2}
  ${padding.x4}
  ${buttonVariants(props.variant)}
`;

const circleButton = () => css`
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;

  ${padding.a0}
  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const defaultFlexProps = {
  inline: true,
  justifyContent: 'center',
  alignItems: 'center',
};

export const Button = applyFlexTo(styled.button`
  ${baseButton}
`, defaultFlexProps);

function LinkWithClassName (props) {
  return (
    <Link
      className={props.className}
      to={props.to}
      replace={props.replace}
      state={props.state}
      reloadDocument={props.reloadDocument}
      aria-label={props['aria-label']}
    >
      {props.children}
    </Link>
  );
}

export const ButtonLink = applyFlexTo(styled(LinkWithClassName)`
  ${baseButton}
`, defaultFlexProps);

export const CircleButton = styled(Button)`
  ${circleButton}
`;

export const CircleButtonLink = styled(ButtonLink)`
  ${circleButton}
`;
