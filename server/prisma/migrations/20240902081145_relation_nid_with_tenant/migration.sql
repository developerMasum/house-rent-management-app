/*
  Warnings:

  - You are about to drop the column `tenantId` on the `maintenance_requests` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `tenant` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `tenant` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `tenant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "maintenance_requests" DROP CONSTRAINT "maintenance_requests_tenantId_fkey";

-- DropIndex
DROP INDEX "tenant_email_key";

-- DropIndex
DROP INDEX "tenant_phoneNumber_key";

-- AlterTable
ALTER TABLE "maintenance_requests" DROP COLUMN "tenantId";

-- AlterTable
ALTER TABLE "tenant" DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "phoneNumber",
ADD COLUMN     "nidInfoId" TEXT,
ALTER COLUMN "familyInfo" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tenant" ADD CONSTRAINT "tenant_nidInfoId_fkey" FOREIGN KEY ("nidInfoId") REFERENCES "nidinfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_requests" ADD CONSTRAINT "maintenance_requests_id_fkey" FOREIGN KEY ("id") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
