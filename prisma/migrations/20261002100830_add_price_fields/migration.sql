-- CreateTable
CREATE TABLE "Tea" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "teaType" TEXT NOT NULL,
    "harvest" TEXT NOT NULL,
    "caffeineLevel" TEXT NOT NULL,
    "accentColor" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "name" JSONB NOT NULL,
    "shortDescription" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "origin" JSONB NOT NULL,
    "flavorNotes" JSONB NOT NULL,
    "images" TEXT[],
    "priceCents" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeaWare" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "teaWareType" TEXT NOT NULL,
    "accentColor" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "name" JSONB NOT NULL,
    "shortDescription" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "material" JSONB NOT NULL,
    "origin" JSONB NOT NULL,
    "craftsman" JSONB,
    "capacityMl" INTEGER,
    "images" TEXT[],
    "priceCents" INTEGER NOT NULL,
    "saleUnitGrams" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeaWare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tea_slug_key" ON "Tea"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TeaWare_slug_key" ON "TeaWare"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");
