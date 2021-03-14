import { GetStaticProps } from 'next';
import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';
import Stripe from 'stripe';
import stripeConfig from '../config/stripe';

import {
  Card,
  Step,
  Button,
  Stepper,
  StepLabel,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
  CardActionArea,
  LinearProgress,
} from '@material-ui/core';


const MainContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CardStyled = styled(Card)`
  max-width: 345px;
  margin: 32px 24px;
`;

const CardDescription = styled.p`
  height: 60px;
`;

const CardMediaStyled = styled(CardMedia)`
  height: 480px;
`;

const StepperStyled = styled(Stepper)`
  margin: 32px;
`;

const LinearProgressWrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
`;

interface Props {
  products: Stripe.Product[];
}

export const getStaticProps: GetStaticProps = async () => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-08-27',
  });

  const products = await stripe.products.list();

  return {
    props: {
      products: products.data,
    }
  }
}

const Home: React.FC<Props> = ({ products }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setLoading(true);
  };

  Router.events.on('routeChangeStart', showLoading);

  const steps = [
    {
      label: 'Catálogo de produtos',
      completed: true,
    },
    {
      label: 'Detalhes do produto',
      completed: false,
    },
    {
      label: 'Pagamento',
      completed: false,
    }
  ];

  return (
    <MainContent>
      {loading && (
        <LinearProgressWrapper>
          <LinearProgress />
        </LinearProgressWrapper>
      )}
      <StepperStyled>
        {steps.map((item) => {
          return (
            <Step key={item.label} completed={item.completed}>
              <StepLabel>{item.label}</StepLabel>
            </Step>
          );
        })}
      </StepperStyled>
      <ProductsWrapper>
        {products.map((product, i) => {
          return (
            <CardStyled
              key={product.id}
            >
              <CardActionArea>
                {product.images.map((src) => {
                  return (
                    <CardMediaStyled
                      key={src}
                      title={product.name}
                    >
                      <Image
                        key={src}
                        src={src}
                        alt={product.name}
                        width={400}
                        height={520}
                      />
                    </CardMediaStyled>
                  )
                })}
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {product.name}
                  </Typography>
                  <CardDescription>
                    <Typography variant="body2" color="textSecondary">
                      {product.description}
                    </Typography>
                  </CardDescription>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => { router.push(`/produto/${product.id}`); }}
                >
                  Ver detalhes
                </Button>
              </CardActions>
            </CardStyled>
          )
        })}
      </ProductsWrapper>
    </MainContent>
  )
}

export default Home;
