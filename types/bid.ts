import { Bid, User } from '@prisma/client';

export type BidWithUser = Bid & { user: User };
