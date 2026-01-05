import {defineConfig} from 'prisma';
import {config} from 'dotenv';

config(); // Load environment variables from .env file

export default defineConfig({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
