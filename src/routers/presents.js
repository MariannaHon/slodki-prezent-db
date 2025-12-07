import { Router } from "express";
import { getPresentsController, getRecordByIdController, createPresentController, patchPresentController, deletePresentController, patchPhotoController } from "../controllers/presents.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createPresentSchema } from '../validation/presents.js';
import { updatePresentSchema } from "../validation/presents.js";
import { isValidId } from "../middlewares/isValidId.js";
import { upload } from '../middlewares/multer.js';


const router = Router();

router.get('/', ctrlWrapper(getPresentsController));

router.get('/:recordId', isValidId, ctrlWrapper(getRecordByIdController));

router.post('/', validateBody(createPresentSchema), ctrlWrapper(createPresentController));

router.patch('/:recordId', isValidId, validateBody(updatePresentSchema), ctrlWrapper(patchPresentController));

router.delete('/:recordId', isValidId, ctrlWrapper(deletePresentController));

router.patch(
  '/:recordId/photo',
  upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'photo2', maxCount: 1 },
  { name: 'photo3', maxCount: 1 },
  { name: 'photo4', maxCount: 1 },
]),
  ctrlWrapper(patchPhotoController)
);


export default router;
