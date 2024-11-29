import { Router } from 'express';

import * as contactsControllers from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/IsValidId.js';
import { validateBody } from '../utils/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactRouter = Router();

contactRouter.use(authenticate);

contactRouter.get('/', ctrlWrapper(contactsControllers.getContactsController));

contactRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsControllers.getContactByIdController),
);

contactRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(contactsControllers.addContactController),
);

contactRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(contactsControllers.patchContactController),
);

contactRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsControllers.deleteContactController),
);

export default contactRouter;
