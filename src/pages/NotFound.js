import Layout from '../components/Layout';
import styled from '@emotion/styled';
import { width } from '../components/utilities';

const ErrorMessage = styled.h3`
  text-align: center;
  ${width.full}
`;

export default function NotFound () {
  return (
    <Layout>
      <ErrorMessage>Not Found.</ErrorMessage>
    </Layout>
  );
}
