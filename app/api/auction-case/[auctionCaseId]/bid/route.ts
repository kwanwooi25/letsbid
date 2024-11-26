import { DEFAULT_BID_INCLUDE } from '@/app/api/bid/const';
import { handleFail, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { BiddingFormSchema } from '@/components/pages/BiddingForm/formSchema';
import { auth } from '@/features/auth';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';

export const POST = auth(async function POST(req, { params }) {
  try {
    const user = req.auth?.user;
    const auctionCaseId = String(params?.auctionCaseId);
    if (!user) {
      return handleFail({ status: HttpStatusCode.Unauthorized });
    }

    const data = (await req.json()) as BiddingFormSchema;

    const createdBid = await prisma.bid.create({
      data: {
        ...data,
        auctionCaseId,
        userId: user.id,
      },
      include: DEFAULT_BID_INCLUDE,
    });
    return handleSuccess({ data: createdBid, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});
