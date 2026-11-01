import { PrismaClient } from "@prisma/client";

const globalPrisma = globalThis as unknown as { prisma: PrismaClient };

// singleton
export const prisma = globalPrisma.prisma || new PrismaClient();

globalPrisma.prisma = prisma;