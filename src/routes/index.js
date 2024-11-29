import { Router } from 'express';

import contactRouter from './contacts.js';
import userRouter from './auth.js';

const router = Router();

router.use('/contacts', contactRouter);
router.use('/auth', userRouter);

export default router;
