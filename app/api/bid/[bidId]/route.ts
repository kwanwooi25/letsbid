import { handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { auth } from '@/features/auth';
import { prisma } from '@/lib/prisma';
import { DEFAULT_BID_INCLUDE } from '../const';

export const GET = auth(async function GET(req, { params }) {
  try {
    const user = req.auth?.user;
    const bidId = String(params?.bidId);

    const bid = await prisma.bid.findUnique({
      where: { id: bidId, userId: user?.id },
      include: DEFAULT_BID_INCLUDE,
    });
    return handleSuccess({ data: bid });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});

export const PATCH = auth(async function PATCH(req, { params }) {
  try {
    const bidId = String(params?.bidId);
    const data = await req.json();

    const bid = await prisma.bid.update({
      where: { id: bidId },
      data,
      include: DEFAULT_BID_INCLUDE,
    });
    return handleSuccess({ data: bid });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});

export const DELETE = auth(async function DELETE(req, { params }) {
  try {
    const user = req.auth?.user;
    const bidId = String(params?.bidId);

    await prisma.bid.delete({
      where: { id: bidId, userId: user?.id },
    });
    return handleSuccess({ data: bidId });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});
