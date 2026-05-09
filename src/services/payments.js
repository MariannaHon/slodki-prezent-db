

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (products) => {
  const line_items = products.map((item) => ({
    price_data: {
      currency: "pln",

      product_data: {
        name: item.name,
      },

      unit_amount: item.price * 100,
    },

    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "blik", "p24", "paypal"],

    line_items,

    mode: "payment",

    success_url: `${process.env.APP_DOMAIN}/thanks`,
    cancel_url: `${process.env.APP_DOMAIN}/cancel`,
  });

  return session;
};
