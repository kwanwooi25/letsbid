-- CreateTable
CREATE TABLE "Bid" (
    "id" TEXT NOT NULL,
    "auctionCaseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expectedSalePrice" INTEGER NOT NULL DEFAULT 0,
    "acquisitionCost" INTEGER NOT NULL DEFAULT 0,
    "evacuationCost" INTEGER NOT NULL DEFAULT 0,
    "repairCost" INTEGER NOT NULL DEFAULT 0,
    "brokerageFee" INTEGER NOT NULL DEFAULT 0,
    "estimatedInterest" INTEGER NOT NULL DEFAULT 0,
    "otherCost" INTEGER NOT NULL DEFAULT 0,
    "expectedProfit" INTEGER NOT NULL DEFAULT 0,
    "biddingPrice" INTEGER NOT NULL DEFAULT 0,
    "isExcluded" BOOLEAN NOT NULL DEFAULT false,
    "excludedReason" TEXT,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_auctionCaseId_fkey" FOREIGN KEY ("auctionCaseId") REFERENCES "AuctionCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
