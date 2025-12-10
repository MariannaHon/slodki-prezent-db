import { Router } from "express";
import { getBlogController, getRecordByIdController, createBlogController, patchBlogController, deleteBlogController} from "../controllers/blog.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createBlogSchema } from '../validation/blog.js';
import { updateBlogSchema } from "../validation/blog.js";
import { isValidId } from "../middlewares/isValidId.js";
// import { upload } from '../middlewares/multer.js';


const router = Router();

router.get('/', ctrlWrapper(getBlogController));

router.get('/:recordId', isValidId, ctrlWrapper(getRecordByIdController));

router.post('/', validateBody(createBlogSchema), ctrlWrapper(createBlogController));

router.patch('/:recordId', isValidId, validateBody(updateBlogSchema), ctrlWrapper(patchBlogController));

router.delete('/:recordId', isValidId, ctrlWrapper(deleteBlogController));


export default router;