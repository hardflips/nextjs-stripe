import React from 'react';
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';

import stripeConfig from '../config/stripe';

import { Button } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

const stripePromise = loadStripe(stripeConfig.publicKey);

interface Props {
  priceId: string;
  itemName: string;
}

const CheckoutButton: React.FC<Props> = ({ priceId, itemName }) => {
  async function handleClick() {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: priceId,
          quantity: 1,
        }
      ],
      mode: 'payment',
      successUrl: `http://localhost:3000/success?itemName=${itemName}`,
      cancelUrl: `http://localhost:3000/cancel`,
    });
    if (error) {
      console.log(error);
    }
  }

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddShoppingCart />}
      onClick={handleClick}
    >
      Comprar
    </Button>
  )
}

export default CheckoutButton;