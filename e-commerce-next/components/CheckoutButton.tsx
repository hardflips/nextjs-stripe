import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

import { Button } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
interface Props {
  priceId: string;
  itemName: string;
}

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const CheckoutButton: React.FC<Props> = ({ priceId, itemName }) => {

  async function handleClick() {
    const isProd = process.env.NODE_ENV === 'production';
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: priceId,
          quantity: 1,
        }
      ],
      mode: 'payment',
      successUrl: `${isProd ? process.env.BASE_URL : 'http://localhost:3000'}/success?itemName=${itemName}`,
      cancelUrl: `${isProd ? process.env.BASE_URL : 'http://localhost:3000'}/cancel`,
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