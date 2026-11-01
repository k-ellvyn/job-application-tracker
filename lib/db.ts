import { prisma } from "./prisma";

// Note: Make sure you've set the value of DATABASE_URL in your .env file and
// properly configured prisma.config.ts.
// See: https://www.prisma.io/docs/prisma-orm/quickstart/mongodb
export async function connectDB() {
  try {
    await prisma.$connect();
    console.log("You successfully connected to MongoDB!");
    return prisma;
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
export async function disconnectDB() {
  await prisma.$disconnect();
}