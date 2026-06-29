/*
  Warnings:

  - Added the required column `copayAmount` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicationName` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "copayAmount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "hasCardOnFile" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "medicationName" TEXT NOT NULL;
