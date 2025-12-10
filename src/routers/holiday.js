import { Router } from "express";
import { getHolidayController, createHolidayController, patchHolidayController, deleteHolidayController, patchPhotoController} from "../controllers/holiday.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createHolidaySchema } from '../validation/holiday.js';
import { updateHolidaySchema } from "../validation/holiday.js";
import { isValidId } from "../middlewares/isValidId.js";
import { upload } from '../middlewares/multer.js';


const router = Router();

router.get('/', ctrlWrapper(getHolidayController));

router.post('/', validateBody(createHolidaySchema), ctrlWrapper(createHolidayController));

router.patch('/:recordId', isValidId, validateBody(updateHolidaySchema), ctrlWrapper(patchHolidayController));

router.delete('/:recordId', isValidId, ctrlWrapper(deleteHolidayController));

router.patch(
  '/photo/:recordId',
  upload.single('photo'),
  ctrlWrapper(patchPhotoController)
);


export default router;