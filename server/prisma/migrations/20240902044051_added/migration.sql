/*
  Warnings:

  - You are about to drop the column `email` on the `houseowner` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `houseowner` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `houseowner` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `houseowner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `houseowner` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "houseowner_email_key";

-- DropIndex
DROP INDEX "houseowner_phoneNumber_key";

-- AlterTable
ALTER TABLE "houseowner" DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "phoneNumber",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "houseowner_userId_key" ON "houseowner"("userId");

-- AddForeignKey
ALTER TABLE "houseowner" ADD CONSTRAINT "houseowner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
