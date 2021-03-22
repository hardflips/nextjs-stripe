import { GetStaticProps } from 'next';
import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';
import Stripe from 'stripe';

import {
  Card,
  Step,
  Grid,
  Button,
  Stepper,
  StepLabel,
  Container,
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

const CardDescription = styled.p`
  height: 60px;
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
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
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
    <Container maxWidth="md">
      <br />
      <Grid container spacing={3}>
        <Grid
          item
          lg={12}
        >
          {loading && (
            <LinearProgressWrapper>
              <LinearProgress />
            </LinearProgressWrapper>
          )}
          <Stepper>
            {steps.map((item) => {
              return (
                <Step key={item.label} completed={item.completed}>
                  <StepLabel>{item.label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <br />
          <Container maxWidth="xs">
            <Grid container spacing={3}>
              <Grid
                item
                lg={12}
              >
                <ProductsWrapper>
                  {products.map((product, i) => {
                    return (
                      <>
                        <Card
                          key={product.id}
                        >
                          <CardActionArea>
                            {product.images.map((src) => {
                              return (
                                <CardMedia
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
                                </CardMedia>
                              )
                            })}
                            <CardContent>
                              <Typography gutterBottom variant="h5" color="primary" component="span">
                                {product.name}
                              </Typography>
                              <CardDescription>
                                <Typography variant="body2" color="textSecondary" component="span">
                                  {product.description}
                                </Typography>
                              </CardDescription>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Button
                              size="small"
                              color="primary"
                              // onClick={() => { router.push(`/produto/${product.id}`); }}
                              onClick={() => { window.location.href = `/produto/${product.id}` }}
                            >
                              Ver detalhes
                            </Button>
                          </CardActions>
                        </Card>
                        <br />
                      </>
                    )
                  })}
                </ProductsWrapper>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home;
