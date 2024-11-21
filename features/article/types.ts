import { Article, AuctionCase, User } from '@prisma/client';

export type ArticleWithAuctionCaseAuthor = Article & {
  auctionCase: AuctionCase;
  author: User;
  _count: {
    likes: number;
    attachments: number;
  };
};
