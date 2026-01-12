import { createCheckoutSession } from "../services/payments.js";

import Stripe from "stripe";
import { env } from "../utils/env.js";
import { OrdersCollection } from "../db/models/order.js";

const stripe = new Stripe(env("STRIPE_SECRET_KEY"));

export const createCheckoutSessionController = async (req, res, next) => {
  try {
    const { cartItems, email } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const sessionId = await createCheckoutSession(cartItems, email);

    res.status(200).json({
      status: 200,
      message: "Stripe checkout session created successfully",
      sessionId,
    });
  } catch (error) {
    next(error);
  }
};

export const stripeWebhookController = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, env("STRIPE_WEBHOOK_SECRET"));
  } catch (err) {
    console.error("⚠️  Webhook signature verification failed.", err.message);
    return res.sendStatus(400);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await OrdersCollection.findOneAndUpdate(
      { stripeSessionId: session.id },
      { status: "paid" }
    );
  }

  res.json({ received: true });
};