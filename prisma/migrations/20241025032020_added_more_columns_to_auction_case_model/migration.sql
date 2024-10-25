-- AlterTable
ALTER TABLE "AuctionCase" ADD COLUMN     "area" DOUBLE PRECISION,
ADD COLUMN     "completedYear" INTEGER,
ADD COLUMN     "floorLevel" INTEGER,
ADD COLUMN     "floorPlan" TEXT,
ADD COLUMN     "officialValue" INTEGER NOT NULL DEFAULT 0;
