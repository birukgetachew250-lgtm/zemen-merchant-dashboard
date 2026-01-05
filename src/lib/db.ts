
import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv';

config();

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // The datasourceUrl is now configured in the prisma.config.ts and read from the environment
    // for the application runtime, so it doesn't need to be explicitly passed here if the
    // DATABASE_URL environment variable is set.
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
