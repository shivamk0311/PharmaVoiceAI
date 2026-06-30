-- CreateEnum
CREATE TYPE "CallStatus" AS ENUM ('PENDING', 'CALLING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "PaymentChoice" AS ENUM ('PAYMENT_LINK', 'CARD_ON_FILE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('NOT_STARTED', 'LINK_SENT', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "CallSession" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "vapiCallId" TEXT,
    "status" "CallStatus" NOT NULL DEFAULT 'PENDING',
    "verificationPassed" BOOLEAN NOT NULL DEFAULT false,
    "refillConfirmed" BOOLEAN,
    "paymentChoice" "PaymentChoice",
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "transcript" TEXT,
    "needsFollowUp" BOOLEAN NOT NULL DEFAULT false,
    "followUpReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CallSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CallSession_vapiCallId_key" ON "CallSession"("vapiCallId");

-- AddForeignKey
ALTER TABLE "CallSession" ADD CONSTRAINT "CallSession_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
