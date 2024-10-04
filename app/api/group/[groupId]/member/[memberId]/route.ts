import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { groupId: string; memberId: string } },
) {
  try {
    await getUserFromSession();
    await prisma.usersOnGroups.delete({
      where: {
        userId_groupId: {
          userId: params.memberId,
          groupId: params.groupId,
        },
      },
    });
    return handleSuccess({ data: { groupId: params.groupId, memberId: params.memberId } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
