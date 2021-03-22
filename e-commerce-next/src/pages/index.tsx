import { GetStaticProps } from 'next';
import Image from 'next/image';
import styled from 'styled-components';
import Stripe from 'stripe';
import axios from 'axios';

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
interface Props {
  products: Stripe.Product[];
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get(`http://${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);

  return {
    props: {
      products: response.data.list,
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
        {products && products.map((product: Stripe.Product, i: number) => {
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
                  onClick={() => { window.location.href = `/produto/${product.id}` }}
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
