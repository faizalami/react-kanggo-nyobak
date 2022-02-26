/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';
import { applyFlexTo, Flex, Grid } from '../../components/FlexGrid';
import { margin, pageWrapper, rounded, width } from '../../components/utilities';
import styled from '@emotion/styled';
import mediaQueries from '../../components/media-queries';
import useFormState from '../../hooks/useFormState';
import FormInput, { FormLabel } from '../../components/FormInput';
import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Buttons';

const dummyDetail = {
  name: 'Kertas',
  picture: 'http://localhost:1337/uploads/large_category_page_04_image_card_03_79a516741a.jpg',
  description: 'The biological vogon accelerative influences the astronaut.',
  price: '10000',
  stock: 500,
  category: 'ATK',
};

const MergedSection = styled.section`
  ${mediaQueries.lg} {
    grid-column: span 2 / span 2;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.75rem;
  text-align: center;
  ${margin.t0}
  ${margin.b4}
`;

const formStyle = css`
  row-gap: 0;
`;

const ButtonWrapper = applyFlexTo(MergedSection);

const PicturePreviewImage = styled.img`
  height: 300px;
  ${rounded}
`;

function PicturePreview ({ pictureUrl, productName }) {
  return (
    <Flex column css={[margin.b4, width.full]}>
      <FormLabel>Current Picture</FormLabel>
      <PicturePreviewImage src={pictureUrl} alt={productName} loading="lazy" width={300} height={300}/>
    </Flex>
  );
}

export default function Form () {
  const { id } = useParams();

  const [name, setName, handleFormName] = useFormState('');
  const [price, setPrice, handleFormPrice] = useFormState('');
  const [category, setCategory, handleFormCategory] = useFormState('');
  const [stock, setStock, handleFormStock] = useFormState('');
  const [description, setDescription, handleFormDescription] = useFormState('');
  const [picture, setPicture] = useState(null);

  const pictureInput = useRef();
  const [tempPicture, setTempPicture] = useState(null);

  useEffect(() => {
    if (id) {
      resetForm();
    }
  }, [id]);

  const resetForm = () => {
    setName(id ? dummyDetail.name : '');
    setPrice(id ? dummyDetail.price : '');
    setCategory(id ? dummyDetail.category : '');
    setStock(id ? dummyDetail.stock : '');
    setDescription(id ? dummyDetail.description : '');
    setTempPicture(id ? dummyDetail.picture : '');
    setPicture(null);

    pictureInput.current.value = null;
  };

  const handlePictureLoaded = event => {
    if (event.target.files.length) {
      setPicture(event.target.files[0]);
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    // Submit function
    console.info({
      name, price, category, stock, description, picture,
    });
  };

  return (
    <Grid
      as="form"
      cols={1}
      lg={{ cols: 2 }}
      gap={8}
      css={[pageWrapper, formStyle]}
      onSubmit={handleFormSubmit}
      onReset={resetForm}
    >
      <MergedSection>
        <FormTitle>{id ? 'Edit' : 'Add'} Product</FormTitle>
      </MergedSection>
      <section>
        <FormInput id="name" label="Name" value={name} onChange={handleFormName}/>
        <FormInput id="price" type="number" label="Price" value={price} onChange={handleFormPrice}/>
      </section>
      <section>
        <FormInput id="category" label="Category" value={category} onChange={handleFormCategory}/>
        <FormInput id="stock" type="number" label="Stock" value={stock} onChange={handleFormStock}/>
      </section>
      <MergedSection>
        <FormInput
          id="description"
          type="textarea"
          label="Description"
          value={description}
          onChange={handleFormDescription}
        />
        {
          tempPicture ?
            <PicturePreview pictureUrl={tempPicture} productName={name}/> :
            null
        }
        <FormInput
          id="picture"
          ref={pictureInput}
          type="file"
          label={tempPicture ? 'Change Picture' : 'Picture'}
          onChange={handlePictureLoaded}
        />
      </MergedSection>
      <ButtonWrapper justifyContent="center">
        <Button type="reset" variant="outline" css={margin.r4}>Cancel</Button>
        <Button type="submit">Save</Button>
      </ButtonWrapper>
    </Grid>
  );
}
