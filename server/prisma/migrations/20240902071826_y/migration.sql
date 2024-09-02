/*
  Warnings:

  - You are about to drop the column `electricityBillReading` on the `rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "electricityBillReading";

-- CreateTable
CREATE TABLE "electricity_bill_readings" (
    "id" TEXT NOT NULL,
    "monthName" TEXT NOT NULL,
    "reading" INTEGER NOT NULL,
    "roomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "electricity_bill_readings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "electricity_bill_readings" ADD CONSTRAINT "electricity_bill_readings_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
