import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Stripe from 'stripe';

import {
  Card,
  Step,
  Stepper,
  StepLabel,
  Typography,
  CardContent,
} from '@material-ui/core';

import CheckoutButton from '../../components/CheckoutButton';
import axios from 'axios';


const MainContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepperStyled = styled(Stepper)`
  margin-bottom: 32px;
`;

const CardStyled = styled(Card)`
  width: 400px;
  margin-bottom: 24px;
`;

const ProductContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 16px;
`;

interface Props {
  product: Stripe.Product;
  price: Stripe.Price;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get(`http://${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);

  const paths = response.data.list.map((product: Stripe.Product) => ({
    params: {
      productId: product.id,
    }
  }));

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { productId } = params;
  const response = await axios.post(`http://${process.env.NEXT_PUBLIC_BASE_URL}/api/product`, { productId });

  return {
    props: {
      product: response.data.product,
      price: response.data.price,
    }
  }
}

const Product: React.FC<Props> = ({ product, price }) => {

  const steps = [
    {
      label: 'Catálogo de produtos',
      completed: true,
    },
    {
      label: 'Detalhes do produto',
      completed: true,
    },
    {
      label: 'Pagamento',
      completed: false,
    }
  ];

  return (
    <>
      {product && (
        <>
          <Head>
            <title>{`${product.name} - Lojão do Fabão`}</title>
          </Head>
          <MainContent>
            <StepperStyled>
              {steps.map((item) => {
                return (
                  <Step key={item.label} completed={item.completed}>
                    <StepLabel>{item.label}</StepLabel>
                  </Step>
                );
              })}
            </StepperStyled>
            <ProductContent>
              <ProductBlock>
                {product.images.map((src: string) => {
                  return (
                    <Image
                      key={src}
                      src={src}
                      alt={product.name}
                      width={400}
                      height={520}
                    />
                  )
                })}
              </ProductBlock>
              <ProductBlock>
                <CardStyled>
                  <CardContent>
                    {price.nickname && (
                      <Typography variant="body2" color="textSecondary" component="span" gutterBottom>
                        {price.nickname}
                      </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary" component="span" gutterBottom>
                      Atualizado: {new Date(product.updated * 1000).toLocaleDateString('pt-BR')}
                    </Typography>
                    <br />
                    <Typography color="primary" component="span" gutterBottom variant="h5">
                      {product.name}
                    </Typography>
                    <br />
                    <br />
                    <Typography variant="body2" component="span">
                      {product.description}
                    </Typography>
                  </CardContent>
                </CardStyled>
                <Typography color="textSecondary" component="span">
                  Preço:
            </Typography>
                <Typography color="primary" variant="h4" component="span">
                  R$ {(price.unit_amount / 100).toFixed(2).replace('.', ',')}
                </Typography>
                <ButtonWrapper>
                  <CheckoutButton
                    priceId={price.id}
                    itemName={product.name}
                  />
                </ButtonWrapper>
              </ProductBlock>
            </ProductContent>
          </MainContent>
        </>
      )}
    </>
  )
}

export default Product;