import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// singleton
if (process.env.NODE_ENV === "production") {
    globalForPrisma.prisma = prisma;
}

export { prisma };