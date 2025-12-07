import express from 'express';
import presentsRouter from './presents.js';

// import { swaggerDocs } from '../middlewares/swaggerDocs.js';

const router = express.Router();

router.use('/presents', presentsRouter);
// router.use('/api-docs', swaggerDocs());

export default router;