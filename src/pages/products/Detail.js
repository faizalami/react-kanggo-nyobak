/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';
import { Grid } from '../../components/FlexGrid';
import { margin, pageWrapper, rounded, width } from '../../components/utilities';
import styled from '@emotion/styled';
import { darkGray } from '../../components/variables';
import mediaQueries from '../../components/media-queries';
import { CircleButtonLink } from '../../components/Buttons';
import { ReactComponent as PencilIcon } from '../../icons/pencil.svg';

const dummyDetail = {
  name: 'Kertas',
  picture: 'http://localhost:1337/uploads/large_category_page_04_image_card_03_79a516741a.jpg',
  description: 'The biological vogon accelerative influences the astronaut.',
  price: '10000',
  stock: 500,
  category: 'ATK',
};

const DetailImage = styled.img`
  height: 100%;
  ${width.full}
  ${rounded}
`;

const DetailTitle = styled.h3`
  font-size: 1.75rem;
  ${margin.y0}
`;

const DetailPrice = styled.span`
  color: ${darkGray};
  font-style: italic;
  ${margin.b8}
`;

const DetailLabel = styled.strong`
  color: ${darkGray};
  line-height: 2rem;
`;

const DetailContentSection = styled.section`
  ${mediaQueries.lg} {
    grid-column: span 2 / span 2;
  }
`;

function DetailContent ({ label, children }) {
  return (
    <p>
      <DetailLabel>{label}</DetailLabel><br/>
      {children}
    </p>
  );
}

export default function Details () {
  const { id } = useParams();

  return (
    <Grid as="article" cols={1} lg={{ cols: 3 }} gap={4} css={pageWrapper}>
      <section>
        <DetailImage src={dummyDetail.picture} alt={dummyDetail.name} loading="lazy" width={500} height={300}/>
      </section>
      <DetailContentSection>
        <DetailTitle>{dummyDetail.name}</DetailTitle>
        <DetailPrice>Rp {dummyDetail.price}</DetailPrice>

        <DetailContent label="Description">{dummyDetail.description}</DetailContent>
        <DetailContent label="Category">{dummyDetail.category}</DetailContent>
        <DetailContent label="Stock">{dummyDetail.stock}</DetailContent>

        <CircleButtonLink to={`/product/edit/${id}`} aria-label="Edit">
          <PencilIcon/>
        </CircleButtonLink>
      </DetailContentSection>
    </Grid>
  );
}
