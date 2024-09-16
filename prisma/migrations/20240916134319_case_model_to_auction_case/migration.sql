/*
  Warnings:

  - You are about to drop the `Case` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_groupId_fkey";

-- DropTable
DROP TABLE "Case";

-- CreateTable
CREATE TABLE "AuctionCase" (
    "id" TEXT NOT NULL,
    "caseYear" TEXT NOT NULL,
    "caseNumber" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "bidStartsAt" TIMESTAMP(3) NOT NULL,
    "bidEndsAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuctionCase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AuctionCase" ADD CONSTRAINT "AuctionCase_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
