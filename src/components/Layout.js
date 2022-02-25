/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import { Flex } from './FlexGrid';
import { Button, ButtonLink } from './Buttons';
import { margin, padding } from './utilities';
import { dark, gray } from './variables';

const navBackground = css`background-color: #1e293b`;
const pageTitleBackground = css`background-color: white`;
const appTitle = css`
  color: white;
  font-size: 1.5rem;
`;
const pageTitle = css`
  color: ${dark};
  font-size: 2rem;
`;
const aboutMeButton = css`color: ${gray}`;

export default function Layout (props) {
  return (
    <>
      <nav css={navBackground}>
        <Flex container alignItems="center" css={padding.y4}>
          <h1 css={[margin.y0, margin.r4, appTitle]}>MyWeb</h1>
          <ButtonLink to="/product" variant="dark">Product</ButtonLink>
          <Button
            as="a"
            href="https://faizalami.github.io"
            target="_blank"
            rel="noreferrer"
            variant="link"
            css={aboutMeButton}
          >
            About Me
          </Button>
        </Flex>
      </nav>

      {props.title ?
        <header css={pageTitleBackground}>
          <Flex container alignItems="center" css={padding.y6}>
            <h2 css={[margin.y0, margin.r4, pageTitle]}>{props.title}</h2>
          </Flex>
        </header>
        : null
      }

      <Flex container css={margin.y8}>
        {props.children || <Outlet/>}
      </Flex>
    </>
  );
}
