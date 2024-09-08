-- AlterTable
ALTER TABLE "tenant" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isMarried" BOOLEAN NOT NULL DEFAULT false;
