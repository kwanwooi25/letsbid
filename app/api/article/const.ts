import { Prisma } from '@prisma/client';

export const DEFAULT_ARTICLE_INCLUDE: Prisma.ArticleInclude = {
  author: true,
  auctionCase: true,
  _count: {
    select: {
      likes: true,
      attachments: true,
    },
  },
};
