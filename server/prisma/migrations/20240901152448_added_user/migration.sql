/*
  Warnings:

  - You are about to drop the column `email` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Made the column `role` on table `admin` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "admin_email_key";

-- DropIndex
DROP INDEX "admin_phoneNumber_key";

-- AlterTable
ALTER TABLE "admin" DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "phoneNumber",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "role" SET NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNumber_key" ON "users"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "admin_userId_key" ON "admin"("userId");

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
