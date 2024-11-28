import { Router } from 'express';

import * as contactsControllers from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/IsValidId.js';

const contactRouter = Router();

contactRouter.get('/', ctrlWrapper(contactsControllers.getContactsController));

contactRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsControllers.getContactByIdController),
);

contactRouter.post('/', ctrlWrapper(contactsControllers.addContactController));

contactRouter.patch(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsControllers.patchContactController),
);

contactRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsControllers.deleteContactController),
);

export default contactRouter;
