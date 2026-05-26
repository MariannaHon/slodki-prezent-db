import { Router } from "express";
import { addNewsletterController, patchNewsletterController,deleteNewsletterController, getNewsletterController } from "../controllers/newsletter.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createNewsletterSchema } from "../validation/newsletter.js";
import { updateNewsletterSchema } from "../validation/newsletter.js";
import { isValidId } from "../middlewares/isValidId.js";



const router = Router();

router.post('/', validateBody(createNewsletterSchema), ctrlWrapper(addNewsletterController));

router.get('/:newsletterId', isValidId, ctrlWrapper(getNewsletterController));


router.patch('/:newsletterId', isValidId, validateBody(updateNewsletterSchema), ctrlWrapper(patchNewsletterController));

router.delete('/:newsletterId', isValidId, ctrlWrapper(deleteNewsletterController));


export default router;