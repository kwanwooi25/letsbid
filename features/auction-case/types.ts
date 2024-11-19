import { Article, AuctionCase, Bid, User } from '@prisma/client';

export type AuctionCaseStatus = 'BEFORE_BIDDING' | 'BIDDING' | 'FINISHED_BIDDING';

export type AuctionCaseWithBidsAndUserAndArticles = AuctionCase & {
  bids: (Bid & { user: User })[];
  articles: Article[];
};

export type AuctionCaseWithBidsSecretAndArticles = AuctionCase & {
  bids: Pick<Bid, 'id' | 'userId'>[];
  articles: Article[];
};

export type AuctionCaseLike =
  | AuctionCaseWithBidsAndUserAndArticles
  | AuctionCaseWithBidsSecretAndArticles;
