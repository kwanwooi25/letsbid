import { Prisma } from '@prisma/client';
import { DEFAULT_AUCTION_CASE_INCLUDE } from '../auction-case/const';

export const DEFAULT_BID_INCLUDE = {
  user: true,
  auctionCase: {
    include: DEFAULT_AUCTION_CASE_INCLUDE,
  },
} satisfies Prisma.BidInclude;
