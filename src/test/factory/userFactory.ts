// test/utils/prismaUtils.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient().user;

// Function to create a user in the database
export const createUser = async userData => {
  return await prisma.create({
    data: userData
  });
};

// Function to clean up all users from the database
export const cleanupUsers = async () => {
  await prisma.deleteMany({});
};
