// test/utils/prismaUtils.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient().bookmark;

// Function to create a bookmark in the database
export const createBookmark = async bookmarkData => {
  return await prisma.create({
    data: bookmarkData
  });
};

// Function to clean up all bookmarks from the database
export const cleanupBookmarks = async () => {
  await prisma.deleteMany({});
};
