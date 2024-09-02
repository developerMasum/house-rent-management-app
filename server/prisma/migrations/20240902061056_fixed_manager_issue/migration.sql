/*
  Warnings:

  - You are about to drop the column `role` on the `houses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[managerId]` on the table `houses` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "houses" DROP COLUMN "role",
ADD COLUMN     "managerId" TEXT;

-- AlterTable
ALTER TABLE "rooms" ALTER COLUMN "vacantTo" DROP NOT NULL;

-- CreateTable
CREATE TABLE "managers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "role" "UserRole" DEFAULT 'MANAGER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "houseOwnerId" TEXT NOT NULL,

    CONSTRAINT "managers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "managers_userId_key" ON "managers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "houses_managerId_key" ON "houses"("managerId");

-- AddForeignKey
ALTER TABLE "managers" ADD CONSTRAINT "managers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "managers" ADD CONSTRAINT "managers_houseOwnerId_fkey" FOREIGN KEY ("houseOwnerId") REFERENCES "houseowner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "houses" ADD CONSTRAINT "houses_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "managers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
