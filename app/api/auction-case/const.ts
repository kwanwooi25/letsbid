import { Prisma } from '@prisma/client';

export const DEFAULT_AUCTION_CASE_INCLUDE: Prisma.AuctionCaseInclude = {
  bids: {
    include: {
      user: true,
    },
  },
  articles: {
    where: {
      isPublished: true,
    },
  },
};
