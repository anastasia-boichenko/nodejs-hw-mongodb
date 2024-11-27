import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

export function setupServer() {
  const app = express();

  // Налаштування CORS
  app.use(cors());

  // Логгер pino
  const logger = pino();
  app.use(logger);

  // Обробка неіснуючих маршрутів
  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Запуск сервера
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
