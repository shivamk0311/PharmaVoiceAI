-- AlterTable
ALTER TABLE "CallSession" ADD COLUMN     "staffCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "staffCompletedAt" TIMESTAMP(3),
ADD COLUMN     "staffCompletedBy" TEXT;
