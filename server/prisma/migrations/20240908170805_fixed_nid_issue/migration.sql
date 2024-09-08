/*
  Warnings:

  - You are about to drop the column `nidInfoId` on the `tenant` table. All the data in the column will be lost.
  - You are about to drop the `lease_agreements` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tenantId` to the `nidinfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "lease_agreements" DROP CONSTRAINT "lease_agreements_roomId_fkey";

-- DropForeignKey
ALTER TABLE "lease_agreements" DROP CONSTRAINT "lease_agreements_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "tenant" DROP CONSTRAINT "tenant_nidInfoId_fkey";

-- AlterTable
ALTER TABLE "nidinfo" ADD COLUMN     "tenantId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tenant" DROP COLUMN "nidInfoId";

-- DropTable
DROP TABLE "lease_agreements";

-- AddForeignKey
ALTER TABLE "nidinfo" ADD CONSTRAINT "nidinfo_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
