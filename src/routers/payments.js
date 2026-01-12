import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createCheckoutSessionController, stripeWebhookController } from "../controllers/payments.js";

const router = Router();

router.post("/create-session", ctrlWrapper(createCheckoutSessionController));

router.post("/webhook", ctrlWrapper(stripeWebhookController));


export default router;




