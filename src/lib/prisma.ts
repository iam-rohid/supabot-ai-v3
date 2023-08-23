import { PrismaClient } from "@prisma/client";

declare global {
  var __db__: PrismaClient;
}

const prisma = global.__db__ || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  global.__db__ = prisma;
}

export { prisma };
