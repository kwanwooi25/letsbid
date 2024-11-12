import { AuctionCaseFormSchema } from '@/components/pages/AuctionCaseForm/formSchema';
import { getUserFromSession, handleFail, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { filterBidDetails } from '@/lib/auctionCase';
import { prisma } from '@/lib/prisma';
import { formToJSON, HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { getAuctionCaseDataInput } from './utils';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const groupId = url.searchParams.get('groupId');
    if (!groupId) {
      return handleFail({
        status: HttpStatusCode.BadRequest,
        message: 'groupId required',
      });
    }
    const user = await getUserFromSession();
    const auctionCases = await prisma.auctionCase.findMany({
      where: { groupId },
      include: {
        bids: {
          include: {
            user: true,
          },
        },
      },
      orderBy: [{ bidEndsAt: 'desc' }, { bidStartsAt: 'desc' }],
    });
    return handleSuccess({
      data: auctionCases.map((auctionCase) => filterBidDetails(auctionCase, user?.id)),
    });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    await getUserFromSession();
    const formData = await req.formData();
    const json = formToJSON(formData) as AuctionCaseFormSchema;
    const data = await getAuctionCaseDataInput(json);

    const createdAuctionCase = await prisma.auctionCase.create({
      data,
      include: {
        group: true,
      },
    });
    return handleSuccess({ data: createdAuctionCase, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
