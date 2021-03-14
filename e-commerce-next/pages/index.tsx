import { GetStaticProps } from 'next';
import Stripe from 'stripe';
import styled from 'styled-components';
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
} from '@material-ui/core';


const MainContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
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
                      image={src}
                      title={product.name}
                    />
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
                  onClick={() => { window.location.href = `/${product.id}` }}
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
