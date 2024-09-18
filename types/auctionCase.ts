import { AuctionCase, Bid, User } from '@prisma/client';

export type AuctionCaseStatus = 'BEFORE_BIDDING' | 'BIDDING' | 'FINISHED_BIDDING';

export type AuctionCaseWithBidsAndUser = AuctionCase & {
  bids: (Bid & { user: User })[];
};

export type AuctionCaseWithBidsSecret = AuctionCase & {
  bids: Pick<Bid, 'id' | 'userId'>[];
};

export type AuctionCaseLike = AuctionCaseWithBidsAndUser | AuctionCaseWithBidsSecret;
