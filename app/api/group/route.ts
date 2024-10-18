import { GroupFormSchema } from '@/app/group/components/GroupForm/formSchema';
import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { hashPassword } from '../user/utils';

export async function GET() {
  try {
    const user = await getUserFromSession();
    const userId = user!.id!;
    const groups = await prisma.group.findMany({
      where: {
        members: {
          none: {
            userId,
          },
        },
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

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromSession();
    const userId = user!.id!;
    const data = (await req.json()) as GroupFormSchema;
    const createdGroup = await prisma.group.create({
      data: {
        ...data,
        password: hashPassword(data.password),
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
