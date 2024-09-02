/*
  Warnings:

  - Added the required column `year` to the `electricity_bill_readings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "electricity_bill_readings" ADD COLUMN     "year" INTEGER NOT NULL;
