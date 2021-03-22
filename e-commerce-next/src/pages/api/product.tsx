import { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

export default async (request: VercelRequest, response: VercelResponse) => {
  const { productId } = request.body;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
  });

  const product = await stripe.products.retrieve(productId as string);
  const price = (await stripe.prices.list({ product: productId as string })).data.shift();
  return response.status(201).json({ success: true, product, price });
};