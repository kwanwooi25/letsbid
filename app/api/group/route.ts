import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();

  try {
    const data = await req.json();
    const createdGroup = await prisma.group.create({
      data: {
        name: data.name,
        hostId: user!.id!,
        members: {
          create: {
            userId: user!.id!,
            invitedBy: user!.id!,
          },
        },
      },
      include: {
        members: true,
      },
    });
    return handleSuccess({ data: createdGroup, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
