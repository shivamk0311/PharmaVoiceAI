/*
  Warnings:

  - You are about to drop the column `DateOfBirth` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `dateOfBirth` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "DateOfBirth",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL;
