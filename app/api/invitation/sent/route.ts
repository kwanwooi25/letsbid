import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const user = await getUserFromSession();
    const userId = user!.id!;
    const invitations = await prisma.invitation.findMany({
      where: { inviterId: userId, status: 'PENDING' },
      include: {
        group: true,
        inviter: true,
      },
    });
    return handleSuccess({ data: invitations });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
