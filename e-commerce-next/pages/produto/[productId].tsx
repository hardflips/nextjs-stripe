import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Stripe from 'stripe';

import stripeConfig from '../../config/stripe';

import {
  Card,
  Step,
  Stepper,
  StepLabel,
  Typography,
  CardContent,
} from '@material-ui/core';

import CheckoutButton from '../../components/CheckoutButton';


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
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-08-27',
  });

  const products = await stripe.products.list();

  const paths = products.data.map((product) => ({
    params: {
      productId: product.id,
    }
  }));

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-08-27',
  });

  const { productId } = params;

  const product = await stripe.products.retrieve(productId as string);
  const price = (await stripe.prices.list({ product: productId as string })).data.shift();

  return {
    props: {
      product: product,
      price: price,
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
      {product && (
        <ProductContent>
          <ProductBlock>
            {product.images.map((src) => {
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
                  <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                    {price.nickname}
                  </Typography>
                )}
                <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                  Atualizado: {new Date(product.updated * 1000).toLocaleDateString('pt-BR')}
                </Typography>
                <Typography color="primary" gutterBottom variant="h5">
                  {product.name}
                </Typography>
                <br />
                <Typography variant="body2" component="p">
                  {product.description}
                </Typography>
              </CardContent>
            </CardStyled>
            <Typography color="textSecondary">
              Preço:
            </Typography>
            <Typography color="primary" variant="h4">
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
      )}
    </MainContent>
  )
}

export default Product;