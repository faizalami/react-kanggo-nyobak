/** @jsxImportSource @emotion/react */
import { ButtonLink } from '../../components/Buttons';
import { Flex, Grid } from '../../components/FlexGrid';
import { margin, width, textIcon, pageWrapper } from '../../components/utilities';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import ProductCard from '../../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { selectData } from '../../redux/products/products.selectors';
import { useCallback, useEffect, useMemo } from 'react';
import { deleteProduct, loadProductData } from '../../redux/products/products.actions';

export default function Index () {
  const dispatch = useDispatch();
  const products = useSelector(selectData);

  const dispatchLoadProducts = useCallback(() => {
    dispatch(loadProductData());
  }, [dispatch]);

  const productWithThumbnail = useMemo(() => {
    return products.map(item => {
      return {
        ...item,
        picture: item.picture ? `${process.env.REACT_APP_API_BASE_URL}${item.picture.url}` : '',
      };
    });
  }, [products]);

  useEffect(() => {
    dispatchLoadProducts();
  }, [dispatchLoadProducts]);

  const handleDelete = id => {
    dispatch(deleteProduct(id));
  }

  return (
    <Flex css={width.full}>
      <ButtonLink to="/product/add" css={margin.lAuto}>
        <PlusIcon css={[textIcon, margin.r1]}/> New Product
      </ButtonLink>

      <Grid as="article" cols={1} gap={4} lg={{ cols: 4 }} css={[pageWrapper, margin.t3]}>
        {productWithThumbnail.map((item, index) => (
          <ProductCard key={index} {...item} onDelete={handleDelete}/>
        ))}
      </Grid>
    </Flex>
  );
}
