-- AlterTable
ALTER TABLE "Tea" ADD COLUMN     "allergens" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "ingredients" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "legalName" JSONB NOT NULL DEFAULT '{}';