import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    await getUserFromSession();
    const auctionCases = await prisma.auctionCase.findMany({
      where: {
        groupId: params.groupId,
      },
    });
    return handleSuccess({ data: auctionCases });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
