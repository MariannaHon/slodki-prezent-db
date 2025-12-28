import { Router } from "express";
import { contactForm } from '../controllers/email.js';

const router = Router();

router.post('/', contactForm);

export default router;
