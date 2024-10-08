// test/utils/prismaUtils.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().housePost;

// Function to create a house in the database
export const createHouse = async (houseData) => {
  return await prisma.create({
    data: houseData,
  });
};

// Function to clean up all houses from the database
export const cleanupHouses = async () => {
  await prisma.deleteMany({});
};
