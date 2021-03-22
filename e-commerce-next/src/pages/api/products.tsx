import { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';


export default async (request: VercelRequest, response: VercelResponse) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
  });

  const products = await stripe.products.list();
  return response.status(201).json({ success: true, list: products.data });
};