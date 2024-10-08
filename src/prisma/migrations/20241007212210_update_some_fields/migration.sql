/*
  Warnings:

  - You are about to drop the column `hostName` on the `HousePost` table. All the data in the column will be lost.
  - You are about to drop the column `hostProfileMedia` on the `HousePost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HousePost" DROP COLUMN "hostName",
DROP COLUMN "hostProfileMedia",
ALTER COLUMN "absolute_location" DROP NOT NULL;
