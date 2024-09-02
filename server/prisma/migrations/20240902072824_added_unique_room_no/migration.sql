/*
  Warnings:

  - A unique constraint covering the columns `[roomNo]` on the table `rooms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "rooms_roomNo_key" ON "rooms"("roomNo");
