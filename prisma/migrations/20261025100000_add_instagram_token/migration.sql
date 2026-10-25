-- CreateTable
CREATE TABLE "InstagramToken" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "token" TEXT NOT NULL,
    "refreshedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InstagramToken_pkey" PRIMARY KEY ("id")
);
