import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import {
  Alert,
  AlertTitle,
} from '@material-ui/lab';

import {
  Grid,
  Button,
  Container,
} from '@material-ui/core';

const AlertStyled = styled(Alert)`
  display: flex;
`;

const CancelPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Ops! - Lojão do Fabão</title>
      </Head>
      <Container maxWidth="md">
        <br />
        <Grid container spacing={3}>
          <Grid
            item
            lg={12}
          >
            <AlertStyled severity="warning">
              <AlertTitle>Ops, não conseguimos concluir sua compra.</AlertTitle>
              Tente novamente em alguns minutos.
            </AlertStyled>
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

export default CancelPage;
