import { Prisma } from '@prisma/client';

export const DEFAULT_ARTICLE_INCLUDE = {
  author: true,
  auctionCase: true,
  _count: {
    select: {
      likes: true,
      attachments: true,
    },
  },
} satisfies Prisma.ArticleInclude;
