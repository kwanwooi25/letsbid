import { Article, User } from '@prisma/client';
import { AuctionCaseLike } from '../auction-case/types';

export type ArticleWithAuctionCaseAuthor = Article & {
  auctionCase: AuctionCaseLike;
  author: User;
  _count: {
    likes: number;
    views: number;
    attachments: number;
  };
};
