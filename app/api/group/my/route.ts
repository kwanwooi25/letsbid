import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const user = await getUserFromSession();
    const userId = user!.id!;
    const groups = await prisma.group.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
        archivedAt: null,
      },
      include: {
        members: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return handleSuccess({ data: groups });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
