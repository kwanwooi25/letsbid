import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

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
      },
      include: {
        members: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return handleSuccess({ data: groups });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromSession();
    const userId = user!.id!;
    const data = await req.json();
    const createdGroup = await prisma.group.create({
      data: {
        name: data.name,
        hostId: userId,
        members: {
          create: {
            userId: userId,
            invitedBy: userId,
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

export async function PATCH(req: NextRequest) {
  try {
    await getUserFromSession();
    const data = await req.json();
    const updatedGroup = await prisma.group.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
      },
      include: {
        members: true,
      },
    });
    return handleSuccess({ data: updatedGroup });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
