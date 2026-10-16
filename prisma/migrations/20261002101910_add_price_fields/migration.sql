/*
  Warnings:

  - You are about to drop the column `saleUnitGrams` on the `TeaWare` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tea" ADD COLUMN     "saleUnitGrams" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "priceCents" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "TeaWare" DROP COLUMN "saleUnitGrams",
ADD COLUMN     "pieceCount" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "priceCents" SET DEFAULT 0;
