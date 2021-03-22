import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import {
  Alert,
  AlertTitle
} from '@material-ui/lab';

import {
  Grid,
  Button,
  Container,
  Typography,
} from '@material-ui/core';

const SuccessPage: React.FC = () => {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Sucesso! - Lojão do Fabão</title>
      </Head>
      <Container maxWidth="md">
        <br />
        <Grid container spacing={3}>
          <Grid
            item
            lg={12}
          >
            <Alert severity="success">
              <AlertTitle>Sua compra foi realizada com sucesso!</AlertTitle>
              Obrigado por comprar com a gente!
            </Alert>
            <Typography color="textSecondary" component="span">
              Produto comprado:
            </Typography>
            <Typography color="primary" variant="h6" component="span">
              {' '}{query.itemName}
            </Typography>
            <br />
            <br />
            <Button
              variant="outlined"
              color="primary"
              href="/">
              Voltar para loja
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default SuccessPage;
