-- CreateEnum
CREATE TYPE "Role" AS ENUM ('tenant', 'host', 'admin');

-- CreateEnum
CREATE TYPE "HouseType" AS ENUM ('RENT', 'SALE', 'GUEST');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'tenant',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HousePost" (
    "id" SERIAL NOT NULL,
    "hostId" INTEGER NOT NULL,
    "hostName" TEXT NOT NULL,
    "hostProfileMedia" TEXT,
    "houseType" "HouseType" NOT NULL,
    "title" TEXT,
    "description" TEXT NOT NULL,
    "street_address" TEXT NOT NULL,
    "absolute_location" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "house_size_sqm" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "rooms" INTEGER NOT NULL,
    "bathRooms" INTEGER,
    "bedRooms" INTEGER,
    "houseRules" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "media" TEXT[],
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HousePost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "HousePost" ADD CONSTRAINT "HousePost_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
