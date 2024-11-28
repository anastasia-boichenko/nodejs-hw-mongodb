import express from 'express';
import cors from 'cors';

import contactRouter from './routes/contacts.js';

import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { logger } from './middlewares/logger.js';

const PORT = Number(env('PORT', '3000'));

export function setupServer() {
  const app = express();

  app.use(cors());
  app.use(logger);
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use('/contacts', contactRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
