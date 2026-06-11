

import Stripe from "stripe";
import { createOrder, updateOrderBySessionId } from "./order.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (products, customer) => {
  const totalAmount = products.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const order = await createOrder({
    items: products,
    totalAmount,
    email: customer.email,
    customer,
    status: 'pending',
  });

  const line_items = products.map((item) => ({
    price_data: {
      currency: "pln",

      product_data: {
        name: item.name,
        images: item.photo ? [item.photo] : [],
      },

      unit_amount: Math.round(item.price * 100),
    },

    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "blik", "p24", "paypal"],

    line_items,

    mode: "payment",

    success_url: `${process.env.APP_DOMAIN}/thanks?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_DOMAIN}/cancel`,
    customer_email: customer.email,

    metadata: {
      orderId: order._id.toString(),
      email: customer.email,
      name: customer.name,
    },
  });
    
  await updateOrderBySessionId(session.id, {
    stripeSessionId: session.id,
  });

  return session;
};

export const markOrderAsPaid = async (sessionId) => {
  return updateOrderBySessionId(sessionId, {
    status: 'paid',
  });
};

export const markOrderAsFailed = async (sessionId) => {
  return updateOrderBySessionId(sessionId, {
    status: 'failed',
  });
};