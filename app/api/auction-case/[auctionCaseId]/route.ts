import {
  getUserFromSession,
  handleFail,
  handlePrismaClientError,
  handleSuccess,
} from '@/app/api/utils';
import { AuctionCaseFormSchema } from '@/components/pages/AuctionCaseForm/formSchema';
import { filterBidDetails } from '@/features/auction-case/utils';
import { prisma } from '@/lib/prisma';
import { formToJSON, HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { DEFAULT_AUCTION_CASE_INCLUDE } from '../const';
import { getAuctionCaseDataInput } from '../utils';

export async function GET(req: NextRequest, { params }: { params: { auctionCaseId: string } }) {
  try {
    const user = await getUserFromSession();
    const auctionCase = await prisma.auctionCase.findUnique({
      where: { id: params.auctionCaseId },
      include: DEFAULT_AUCTION_CASE_INCLUDE,
    });
    if (!auctionCase) {
      return handleFail({
        status: HttpStatusCode.NotFound,
        message: 'Not found',
      });
    }
    return handleSuccess({ data: filterBidDetails(auctionCase, user?.id) });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { auctionCaseId: string } }) {
  try {
    await getUserFromSession();
    const formData = await req.formData();
    const json = formToJSON(formData) as AuctionCaseFormSchema;
    const data = await getAuctionCaseDataInput(json);

    const updatedAuctionCase = await prisma.auctionCase.update({
      where: { id: params.auctionCaseId },
      data,
      include: DEFAULT_AUCTION_CASE_INCLUDE,
    });

    return handleSuccess({ data: updatedAuctionCase });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { auctionCaseId: string } }) {
  try {
    await getUserFromSession();
    await prisma.auctionCase.delete({
      where: { id: params.auctionCaseId },
    });
    return handleSuccess({ data: { id: params.auctionCaseId } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
