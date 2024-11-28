import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { env } from './utils/env.js';
import * as contactServices from './services/contacts.js';

const PORT = Number(env('PORT', '3000'));

export function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  const logger = pino();
  app.use(logger);

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.get('/contacts', async (req, res) => {
    const data = await contactServices.getContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const data = await contactServices.getContactById(contactId);

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Contact with id ${contactId} not found!`,
      });
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data,
    });
  });

  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use((err, req, res) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
