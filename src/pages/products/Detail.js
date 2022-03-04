/** @jsxImportSource @emotion/react */
import { useParams, Navigate } from 'react-router-dom';
import { Grid } from '../../components/FlexGrid';
import { margin, pageWrapper, rounded, width } from '../../components/utilities';
import styled from '@emotion/styled';
import { darkGray } from '../../components/variables';
import mediaQueries from '../../components/media-queries';
import { CircleButtonLink } from '../../components/Buttons';
import { ReactComponent as PencilIcon } from '../../icons/pencil.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDetailById,
  selectProductsError,
} from '../../redux/products/products.selectors';
import { useCallback, useEffect, useMemo } from 'react';
import { loadProductDetail } from '../../redux/products/products.actions';

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
  const dispatch = useDispatch();
  const error = useSelector(selectProductsError);

  let detailById = useSelector(state => selectDetailById(state, id));

  const dispatchLoadProducts = useCallback(() => {
    dispatch(loadProductDetail(id));
  }, [dispatch, id]);

  const detail = useMemo(() => {
    if (detailById) {
      return {
        ...detailById,
        picture: detailById ? `${process.env.REACT_APP_API_BASE_URL}${detailById.picture.formats.large.url}` : '',
      };
    }
    return null;
  }, [detailById]);

  useEffect(() => {
    if (!detailById) {
      dispatchLoadProducts();
    }
  }, [dispatchLoadProducts, detailById]);

  if (!error) {
    return (
      <Grid as="article" cols={1} lg={{ cols: 3 }} gap={4} css={pageWrapper}>
        {detail ? (<>
          <section>
            <DetailImage src={detail.picture} alt={detail.name} loading="lazy" width={500} height={300}/>
          </section>
          <DetailContentSection>
            <DetailTitle>{detail.name}</DetailTitle>
            <DetailPrice>Rp {detail.price}</DetailPrice>

            <DetailContent label="Description">{detail.description}</DetailContent>
            <DetailContent label="Category">{detail.category}</DetailContent>
            <DetailContent label="Stock">{detail.stock}</DetailContent>

            <CircleButtonLink to={`/product/edit/${id}`} aria-label="Edit">
              <PencilIcon/>
            </CircleButtonLink>
          </DetailContentSection>
        </>) : null}
      </Grid>
    );
  }
  return (<Navigate to="/404"/>);
}
