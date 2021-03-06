import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

import { Button } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
interface Props {
  priceId: string;
  itemName: string;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

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
      successUrl: `http://${process.env.NEXT_PUBLIC_BASE_URL}/success?itemName=${itemName}`,
      cancelUrl: `http://${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
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