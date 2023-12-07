/*
  Warnings:

  - You are about to drop the column `plan` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "plan",
ADD COLUMN     "billing" JSONB;

-- DropEnum
DROP TYPE "BillingPlan";
