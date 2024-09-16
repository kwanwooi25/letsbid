import { AuctionCase } from '@prisma/client';
import { isAfter } from 'date-fns';

export function categorizeAuctionCases(auctionCases: AuctionCase[]) {
  const now = new Date();
  return auctionCases.reduce(
    (acc, cur) => {
      if (isAfter(cur.bidStartsAt, now)) {
        acc.beforeBidding.push(cur);
      } else if (isAfter(cur.bidEndsAt, now)) {
        acc.bidding.push(cur);
      } else {
        acc.finishedBidding.push(cur);
      }
      return acc;
    },
    {
      bidding: [] as AuctionCase[],
      beforeBidding: [] as AuctionCase[],
      finishedBidding: [] as AuctionCase[],
    },
  );
}
