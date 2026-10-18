-- AlterTable
ALTER TABLE "TeaWare" ADD COLUMN     "itemNumber" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "manufacturer" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "manufacturerContact" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "warnings" JSONB NOT NULL DEFAULT '{}';