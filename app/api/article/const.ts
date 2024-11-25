import { Prisma } from '@prisma/client';
import { DEFAULT_AUCTION_CASE_INCLUDE } from '../auction-case/const';

export const DEFAULT_ARTICLE_INCLUDE = {
  author: true,
  auctionCase: {
    include: DEFAULT_AUCTION_CASE_INCLUDE,
  },
  _count: {
    select: {
      likes: true,
      views: true,
      attachments: true,
    },
  },
} satisfies Prisma.ArticleInclude;
