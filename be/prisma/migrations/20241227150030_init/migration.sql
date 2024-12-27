/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Booking_uuid_key" ON "Booking"("uuid");
