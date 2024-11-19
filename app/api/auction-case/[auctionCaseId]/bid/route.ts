import { BiddingFormSchema } from '@/components/pages/BiddingForm/formSchema';
import {
  getUserFromSession,
  handleFail,
  handlePrismaClientError,
  handleSuccess,
} from '@/app/api/utils';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { auctionCaseId: string } }) {
  try {
    const user = await getUserFromSession();
    const data = (await req.json()) as BiddingFormSchema;
    if (!user) {
      return handleFail({ message: 'User not found', status: HttpStatusCode.BadRequest });
    }

    const createdBid = await prisma.bid.create({
      data: {
        ...data,
        auctionCaseId: params.auctionCaseId,
        userId: user.id,
      },
    });
    return handleSuccess({ data: createdBid, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
