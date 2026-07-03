-- CreateEnum
CREATE TYPE "FulfillmentChoice" AS ENUM ('PICKUP', 'DELIVERY');

-- AlterTable
ALTER TABLE "CallSession" ADD COLUMN     "deliveryAddress" TEXT,
ADD COLUMN     "fulfillmentChoice" "FulfillmentChoice";

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "addressLine1" TEXT,
ADD COLUMN     "addressLine2" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "zipCode" TEXT;
