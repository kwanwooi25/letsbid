import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { bidId: string } }) {
  try {
    const user = await getUserFromSession();
    const bid = await prisma.bid.findUnique({
      where: { id: params.bidId, userId: user?.id },
      include: { user: true },
    });
    return handleSuccess({ data: bid });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { bidId: string } }) {
  try {
    const user = await getUserFromSession();
    const data = await req.json();
    const bid = await prisma.bid.update({
      where: { id: params.bidId, userId: user?.id },
      data,
      include: { user: true },
    });
    return handleSuccess({ data: bid });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { bidId: string } }) {
  try {
    const user = await getUserFromSession();
    await prisma.bid.delete({
      where: { id: params.bidId, userId: user?.id },
    });
    return handleSuccess({ data: params.bidId });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
