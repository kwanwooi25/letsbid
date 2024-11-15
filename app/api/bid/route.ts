import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { getAuctionCaseStatus } from '@/lib/auctionCase';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const user = await getUserFromSession();
    const bids = await prisma.bid.findMany({
      where: { userId: user?.id },
      include: {
        user: true,
        auctionCase: {
          include: {
            bids: { include: { user: true } },
            articles: { where: { isPublished: true } },
          },
        },
      },
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
}
