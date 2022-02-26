/** @jsxImportSource @emotion/react */
import { ButtonLink } from '../../components/Buttons';
import { Flex, Grid } from '../../components/FlexGrid';
import { margin, width, textIcon, pageWrapper } from '../../components/utilities';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import ProductCard from '../../components/ProductCard';

const productDummy = [
  {
    name: 'Test',
    picture: 'http://localhost:1337/uploads/thumbnail_category_page_04_image_card_01_81fe1029fa.jpg',
    price: 20000,
  },
  {
    name: 'Test',
    picture: 'http://localhost:1337/uploads/thumbnail_category_page_04_image_card_04_510ae6d0e4.jpg',
    price: 50000,
  },
  {
    name: 'Test',
    picture: 'http://localhost:1337/uploads/thumbnail_category_page_04_image_card_01_81fe1029fa.jpg',
    price: 20000,
  },
  {
    name: 'Test',
    picture: 'http://localhost:1337/uploads/thumbnail_category_page_04_image_card_04_510ae6d0e4.jpg',
    price: 50000,
  },
  {
    name: 'Test',
    picture: 'http://localhost:1337/uploads/thumbnail_category_page_04_image_card_01_81fe1029fa.jpg',
    price: 20000,
  },
  {
    name: 'Test',
    picture: 'http://localhost:1337/uploads/thumbnail_category_page_04_image_card_04_510ae6d0e4.jpg',
    price: 50000,
  },
];

export default function Index () {
  return (
    <Flex css={width.full}>
      <ButtonLink to="/product/add" css={margin.lAuto}>
        <PlusIcon css={[textIcon, margin.r1]}/> New Product
      </ButtonLink>

      <Grid as="article" cols={1} gap={4} lg={{ cols: 4 }} css={[pageWrapper, margin.t3]}>
        {productDummy.map((item, index) => (
          <ProductCard key={index} {...item} />
        ))}
      </Grid>
    </Flex>
  );
}
