import { PrismaClient } from "@prisma/client";

// Singleton so the build/ISR process reuses one client. This module is intended
// for BUILD TIME / server-side use only — never import it from a "use client"
// component, or the Prisma engine will be bundled into client code.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
