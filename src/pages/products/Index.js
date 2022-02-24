/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { Button, ButtonLink, CircleButton } from '../../components/Buttons';
import { m, p } from '../../components/utilities';

const Container = styled.div(props => ({
  display: 'flex',
  flexDirection: props.column && 'column'
}));

export default function Index () {
  return (
    <Container>
      <Button>This is a regular button.</Button>
      <ButtonLink css={[m.aAuto, p.a1]} to="/">This is a regular button.</ButtonLink>
      <Button variant="outline">This is a primary button.</Button>
      <Button variant="dark">This is a primary button.</Button>
      <Button css={m.aAuto} variant="link">This is a primary button.</Button>
      <CircleButton>F</CircleButton>
      <CircleButton variant="danger">F</CircleButton>
    </Container>
  );
}
