/*
  Warnings:

  - Made the column `absolute_location` on table `HousePost` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "HousePost" ALTER COLUMN "absolute_location" SET NOT NULL;
