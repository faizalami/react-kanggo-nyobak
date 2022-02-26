/** @jsxImportSource @emotion/react */
import { Flex } from './FlexGrid';
import styled from '@emotion/styled';
import { darkGray, gray } from './variables';
import { css } from '@emotion/react';
import { margin, padding, rounded, width } from './utilities';
import { forwardRef } from 'react';

export const FormLabel = styled.label`
  font-weight: bold;
  color: ${darkGray};
  ${margin.b2}
`;

const inputStyle = css`
  border: 1px solid ${gray};
  background-color: white;
  font-size: 1rem;
  color: ${darkGray};
  ${padding.a2}
  ${rounded}
`;

const FormInput = forwardRef(({ type, id, label, value, onChange }, ref) => {
  return (
    <Flex column css={[margin.b4, width.full]}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {
        type !== 'textarea'
          ?
          <input id={id} name={id} ref={ref} type={type || 'text'} value={value} onChange={onChange} css={inputStyle}/>
          :
          <textarea id={id} name={id} ref={ref} value={value} rows={3} onChange={onChange} css={inputStyle}/>
      }
    </Flex>
  );
});

export default FormInput;
