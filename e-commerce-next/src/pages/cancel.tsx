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

const CancelPage: React.FC = () => {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Ops! - Lojão do Fabão</title>
      </Head>
      <MainContent>
        <AlertStyled severity="warning">
          <AlertTitle>Ops, não conseguimos concluir sua compra.</AlertTitle>
          Tente novamente em alguns minutos.
        </AlertStyled>
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

export default CancelPage;
