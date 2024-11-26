import { handleFail, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { getAuctionCaseStatus } from '@/features/auction-case/utils';
import { auth } from '@/features/auth';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { DEFAULT_BID_INCLUDE } from './const';

export const GET = auth(async function GET(req) {
  try {
    const user = req.auth?.user;
    if (!user) {
      return handleFail({ status: HttpStatusCode.Unauthorized });
    }

    const bids = await prisma.bid.findMany({
      where: { userId: user.id },
      include: DEFAULT_BID_INCLUDE,
      orderBy: { auctionCase: { bidEndsAt: 'desc' } },
    });
    return handleSuccess({
      data: bids.filter((bid) => {
        const auctionCaseStatus = getAuctionCaseStatus(bid.auctionCase);
        return auctionCaseStatus === 'FINISHED_BIDDING';
      }),
    });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});
