import { Bid, User } from '@prisma/client';
import { AuctionCaseWithBidsAndUser } from './auctionCase';

export type BidWithUser = Bid & { user: User };
export type BidWithUserAndAuctionCase = BidWithUser & { auctionCase: AuctionCaseWithBidsAndUser };
