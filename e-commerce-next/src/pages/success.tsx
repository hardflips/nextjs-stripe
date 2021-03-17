import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import {
  Alert,
  AlertTitle
} from '@material-ui/lab';

import {
  Button,
  Typography,
} from '@material-ui/core';

const MainContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const AlertStyled = styled(Alert)`
  display: flex;
  margin: 16px 16px 24px 16px;
`;

const SuccessPage: React.FC = () => {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Sucesso! - Lojão do Fabão</title>
      </Head>
      <MainContent>
        <AlertStyled severity="success">
          <AlertTitle>Sua compra foi realizada com sucesso!</AlertTitle>
          Obrigado por comprar com a gente!
        </AlertStyled>
        <Typography color="textSecondary" component="span">
          Produto comprado:
        </Typography>
        <Typography color="primary" variant="h6" component="span">
          {query.itemName}
        </Typography>
        <br />
        <Button
          variant="outlined"
          color="primary"
          href="/">
          Voltar para loja
        </Button>
      </MainContent>
    </>
  )
}

export default SuccessPage;
