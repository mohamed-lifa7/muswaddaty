import { PrismaClient } from "@prisma/client";

import { env } from "@/env";

/**
 * Creates a new instance of the PrismaClient.
 * @returns {PrismaClient} The newly created PrismaClient instance.
 */
const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

/**
 * Represents a global variable for Prisma.
 * @property {ReturnType<typeof createPrismaClient> | undefined} prisma - The Prisma client instance.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

/**
 * The database instance.
 * If `globalForPrisma.prisma` is defined, it will be used as the database instance.
 * Otherwise, a new instance of Prisma client will be created.
 */
export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
