/*
  Warnings:

  - You are about to drop the column `caseNumber` on the `AuctionCase` table. All the data in the column will be lost.
  - You are about to drop the column `caseYear` on the `AuctionCase` table. All the data in the column will be lost.
  - Added the required column `caseName` to the `AuctionCase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuctionCase" DROP COLUMN "caseNumber",
DROP COLUMN "caseYear",
ADD COLUMN     "caseName" TEXT NOT NULL;
