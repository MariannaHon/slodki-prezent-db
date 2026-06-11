import { Router } from "express";

import { createCheckoutSessionController } from "../controllers/payments.js";

const router = Router();


router.post("/", createCheckoutSessionController);

export default router;
