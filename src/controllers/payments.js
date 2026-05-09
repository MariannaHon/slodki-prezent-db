

import { createCheckoutSession } from "../services/payments.js";

export const createCheckoutSessionController = async (req, res) => {
  try {
    const { products } = req.body;

    const session = await createCheckoutSession(products);

    res.json({
      url: session.url,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};