import { Article, AuctionCase, Bid } from '@prisma/client';
import { BidWithUser } from '../bid/types';
import { GroupWithMembers } from '../group/types';

export type AuctionCaseStatus = 'BEFORE_BIDDING' | 'BIDDING' | 'FINISHED_BIDDING';

export type AuctionCaseWithBidsAndUserAndArticles = AuctionCase & {
  bids: BidWithUser[];
  articles: Article[];
  group: GroupWithMembers;
};

export type AuctionCaseWithBidsSecretAndArticles = AuctionCase & {
  bids: Pick<Bid, 'id' | 'userId'>[];
  articles: Article[];
  group: GroupWithMembers;
};

export type AuctionCaseLike =
  | AuctionCaseWithBidsAndUserAndArticles
  | AuctionCaseWithBidsSecretAndArticles;

export type AuctionCaseListQueryOptions = {
  page?: number;
  per?: number;
  search?: string;
};
