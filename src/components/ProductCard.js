/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { margin, padding, rounded, width } from './utilities';
import { Flex } from './FlexGrid';
import { gray } from './variables';
import { CircleButton, CircleButtonLink } from './Buttons';
import { ReactComponent as EyeIcon } from '../icons/eye.svg';
import { ReactComponent as PencilIcon } from '../icons/pencil.svg';
import { ReactComponent as TrashIcon } from '../icons/trash.svg';

const CardWrapper = styled(Flex)`
  border: 1px solid ${gray};
  ${rounded}
`;

const CardThumbnail = styled.img`
  aspect-ratio: 1/1;
  object-position: center;
  object-fit: cover;
  ${rounded}
  ${width.full}
`;

export default function ProductCard ({ id, name, picture, price }) {
  return (
    <CardWrapper column>
      <CardThumbnail src={picture} alt={name} loading="lazy" width={300} height={300}/>

      <Flex justifyContent="center" css={[padding.y2, width.full]}>
        <CircleButtonLink to={`/product/${id}`}>
          <EyeIcon/>
        </CircleButtonLink>
        <CircleButtonLink to={`/product/edit/${id}`} css={margin.x2}>
          <PencilIcon/>
        </CircleButtonLink>
        <CircleButton variant="danger">
          <TrashIcon/>
        </CircleButton>
      </Flex>

      <h3 css={[margin.b0, margin.x2]}>{name}</h3>
      <p css={[margin.b2, margin.x2]}>Rp {price}</p>
    </CardWrapper>
  );
}
