import Stripe from 'stripe';

import { createCheckoutSession, markOrderAsFailed, markOrderAsPaid } from "../services/payments.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSessionController = async (req, res) => {
  try {

    const { products, customer } = req.body;

    const session = await createCheckoutSession(products, customer);

    res.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const stripeWebhookController = async (req, res) => {
  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await markOrderAsPaid(session.id);
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object;
    await markOrderAsFailed(session.id);
  }

  res.json({ received: true });
};