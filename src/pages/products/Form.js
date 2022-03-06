/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from 'react-router-dom';
import { applyFlexTo, Flex, Grid } from '../../components/FlexGrid';
import { margin, pageWrapper, rounded, width } from '../../components/utilities';
import styled from '@emotion/styled';
import mediaQueries from '../../components/media-queries';
import useFormState from '../../hooks/useFormState';
import FormInput, { FormLabel } from '../../components/FormInput';
import { css } from '@emotion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../../components/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { selectDetailById, selectProductsError, selectStoredDetailId } from '../../redux/products/products.selectors';
import { createProduct, editProduct, loadProductDetail } from '../../redux/products/products.actions';
import { serialize } from 'object-to-formdata';
import { red } from '../../components/variables';

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

const ErrorMessage = styled.p`
  text-align: center;
  color: ${red};
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
  const dispatch = useDispatch();
  const error = useSelector(selectProductsError);
  const navigate = useNavigate();

  const storedDetailId = useSelector(selectStoredDetailId);
  const detailById = useSelector(state => selectDetailById(state, id));

  const dispatchLoadProducts = useCallback(() => {
    dispatch(loadProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (id && !detailById) {
      dispatchLoadProducts();
    }
  }, [id, dispatchLoadProducts, detailById]);

  const [name, setName, handleFormName] = useFormState('');
  const [price, setPrice, handleFormPrice] = useFormState('');
  const [category, setCategory, handleFormCategory] = useFormState('');
  const [stock, setStock, handleFormStock] = useFormState('');
  const [description, setDescription, handleFormDescription] = useFormState('');
  const [picture, setPicture] = useState(null);

  const pictureInput = useRef();
  const [tempPicture, setTempPicture] = useState(null);

  const resetForm = () => {
    setName(id ? detailById.name : '');
    setPrice(id ? detailById.price : '');
    setCategory(id ? detailById.category : '');
    setStock(id ? detailById.stock : '');
    setDescription(id ? detailById.description : '');
    setPicture(null);

    let tempPicture = id && detailById?.picture
      ? `${process.env.REACT_APP_API_BASE_URL}${detailById.picture.url}`
      : '';
    setTempPicture(tempPicture);

    pictureInput.current.value = null;
  };

  useEffect(() => {
    if (id) {
      resetForm();
    }
  }, [id]);

  const handlePictureLoaded = event => {
    if (event.target.files.length) {
      setPicture(event.target.files[0]);
    }
  };

  const payload = useMemo(() => {
    let payload = {
      data: JSON.stringify({ name, price, category, stock, description }),
    };

    if (picture) {
      payload = {
        ...payload,
        files: {
          picture,
        },
      };
    }

    return serialize(payload, { indices: true });
  }, [name, price, category, stock, description, picture]);

  const handleFormSubmit = event => {
    event.preventDefault();

    if (id) {
      dispatch(editProduct(id, payload));

      if (!error) {
        navigate(`/product/${id}`);
      }
    } else {
      dispatch(createProduct(payload));
    }
  };

  useEffect(() => {
    if (!id && !error && storedDetailId) {
      navigate(`/product/${storedDetailId}`);
    }
  }, [id, error, storedDetailId, navigate]);

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
      {error ? <ErrorMessage>Failed to save product</ErrorMessage> : null}
    </Grid>
  );
}
