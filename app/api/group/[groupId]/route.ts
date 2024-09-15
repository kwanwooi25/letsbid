import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    const user = await getUserFromSession();
    const group = await prisma.group.findUnique({
      where: {
        id: params.groupId,
        members: {
          some: {
            userId: user!.id!,
          },
        },
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });
    return handleSuccess({ data: group });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    await getUserFromSession();
    const data = await req.json();
    const updatedGroup = await prisma.group.update({
      where: {
        id: params.groupId,
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

export async function DELETE(req: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    await getUserFromSession();
    await prisma.group.delete({
      where: {
        id: params.groupId,
      },
    });
    return handleSuccess({ data: { id: params.groupId } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
