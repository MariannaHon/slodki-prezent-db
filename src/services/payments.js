import Stripe from "stripe";
import { env } from "../utils/env.js";
import { OrdersCollection } from "../db/models/order.js";

const stripe = new Stripe(env("STRIPE_SECRET_KEY"));

export const createCheckoutSession = async (cartItems, email) => {
  const line_items = cartItems.map(item => ({
    price_data: {
      currency: "pln",
      product_data: {
        name: item.name,
        images: [item.photo],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "blik", "p24", "paypal", "link"],
    mode: "payment",
    line_items,
    customer_email: email,
    statement_descriptor: "SLODKI PRESENT", 
    success_url: "https://slodki-prezent-shop.vercel.app/thanks",
    cancel_url: "https://slodki-prezent-shop.vercel.app/cancel",
  });

  await OrdersCollection.create({
    items: cartItems,
    totalAmount: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    email,
    status: "pending",
    stripeSessionId: session.id,
  });

  return session.id;
};
