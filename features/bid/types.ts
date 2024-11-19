import { Bid, User } from '@prisma/client';
import { AuctionCaseWithBidsAndUserAndArticles } from '../auction-case/types';

export type BidWithUser = Bid & { user: User };
export type BidWithUserAndAuctionCase = BidWithUser & {
  auctionCase: AuctionCaseWithBidsAndUserAndArticles;
};
