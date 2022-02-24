/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Button, ButtonLink, CircleButton } from './components/Buttons';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Container = styled.div(props => ({
  display: 'flex',
  flexDirection: props.column && 'column'
}));

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/" element={
          <Container>
            <Button>This is a regular button.</Button>
            <ButtonLink css={css`margin: auto`} to="/">This is a regular button.</ButtonLink>
            <Button variant="outline">This is a primary button.</Button>
            <Button variant="dark">This is a primary button.</Button>
            <Button variant="link">This is a primary button.</Button>
            <CircleButton>F</CircleButton>
            <CircleButton variant="danger">F</CircleButton>
          </Container>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
