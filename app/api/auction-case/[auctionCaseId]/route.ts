import { handleFail, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { AuctionCaseFormSchema } from '@/components/pages/AuctionCaseForm/formSchema';
import { filterBidDetails } from '@/features/auction-case/utils';
import { auth } from '@/features/auth';
import { prisma } from '@/lib/prisma';
import { formToJSON, HttpStatusCode } from 'axios';
import { DEFAULT_AUCTION_CASE_INCLUDE } from '../const';
import { getAuctionCaseDataInput } from '../utils';

export const GET = auth(async function GET(req, { params }) {
  try {
    const user = req.auth?.user;
    const auctionCaseId = String(params?.auctionCaseId);

    const auctionCase = await prisma.auctionCase.findUnique({
      where: { id: auctionCaseId },
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
});

export const PATCH = auth(async function PATCH(req, { params }) {
  try {
    const auctionCaseId = String(params?.auctionCaseId);

    const formData = await req.formData();
    const json = formToJSON(formData) as AuctionCaseFormSchema;
    const data = await getAuctionCaseDataInput(json);

    const updatedAuctionCase = await prisma.auctionCase.update({
      where: { id: auctionCaseId },
      data,
      include: DEFAULT_AUCTION_CASE_INCLUDE,
    });

    return handleSuccess({ data: updatedAuctionCase });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});

export const DELETE = auth(async function DELETE(req, { params }) {
  try {
    const auctionCaseId = String(params?.auctionCaseId);

    await prisma.auctionCase.delete({
      where: { id: auctionCaseId },
    });
    return handleSuccess({ data: { id: auctionCaseId } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});
