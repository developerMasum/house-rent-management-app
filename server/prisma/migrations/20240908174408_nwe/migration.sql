/*
  Warnings:

  - You are about to drop the column `currentTenantId` on the `rooms` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `tenant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_currentTenantId_fkey";

-- DropIndex
DROP INDEX "rooms_currentTenantId_key";

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "currentTenantId";

-- AlterTable
ALTER TABLE "tenant" ADD COLUMN     "roomId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tenant" ADD CONSTRAINT "tenant_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
