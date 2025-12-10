import express from 'express';
import presentsRouter from './presents.js';
import blogRouter from './blog.js';
import holidayRouter from './holiday.js';

// import { swaggerDocs } from '../middlewares/swaggerDocs.js';

const router = express.Router();

router.use('/presents', presentsRouter);
router.use('/blog', blogRouter);
router.use('/holiday', holidayRouter);
// router.use('/api-docs', swaggerDocs());

export default router;