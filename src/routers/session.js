import { Router } from "express";

import { getSessionController } from "../controllers/session.js";

const router = Router();

router.get('/:id', getSessionController);

export default router;