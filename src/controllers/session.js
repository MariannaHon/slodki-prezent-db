import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getSessionController = async (req, res) => {

  const session = await stripe.checkout.sessions.retrieve(
    req.params.id
  );

  res.json({
    email: session.customer_email,
    paymentStatus: session.payment_status,
  });
};