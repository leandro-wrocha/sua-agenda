/*
  Warnings:

  - Added the required column `day` to the `available_times` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "available_times" ADD COLUMN     "day" TEXT NOT NULL,
ALTER COLUMN "start_time" SET DATA TYPE TEXT,
ALTER COLUMN "end_time" SET DATA TYPE TEXT;
