import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { AuctionCaseFormSchema } from '@/components/pages/AuctionCaseForm/formSchema';
import { prisma } from '@/lib/prisma';
import { formToJSON, HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { DEFAULT_AUCTION_CASE_INCLUDE } from './const';
import { getAuctionCaseDataInput } from './utils';

export async function POST(req: NextRequest) {
  try {
    await getUserFromSession();
    const formData = await req.formData();
    const json = formToJSON(formData) as AuctionCaseFormSchema;
    const data = await getAuctionCaseDataInput(json);

    const createdAuctionCase = await prisma.auctionCase.create({
      data,
      include: DEFAULT_AUCTION_CASE_INCLUDE,
    });
    return handleSuccess({ data: createdAuctionCase, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
