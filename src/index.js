import { initMongoConection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const boostrap = async () => {
  await initMongoConection();
  setupServer();
};

boostrap();
