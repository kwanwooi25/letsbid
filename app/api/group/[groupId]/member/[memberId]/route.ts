import { handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { auth } from '@/features/auth';
import { prisma } from '@/lib/prisma';

export const DELETE = auth(async function DELETE(req, { params }) {
  try {
    const userId = String(params?.memberId);
    const groupId = String(params?.groupId);

    await prisma.usersOnGroups.delete({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });
    return handleSuccess({ data: { groupId, memberId: userId } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});
