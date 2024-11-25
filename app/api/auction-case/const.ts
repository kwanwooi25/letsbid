import { Prisma } from '@prisma/client';

export const DEFAULT_AUCTION_CASE_INCLUDE = {
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
  group: {
    include: {
      members: true,
    },
  },
} satisfies Prisma.AuctionCaseInclude;
