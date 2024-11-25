import {
  getUserFromSession,
  handleFail,
  handlePrismaClientError,
  handleSuccess,
} from '@/app/api/utils';
import { GroupFormSchema } from '@/components/pages/GroupForm/formSchema';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { hashPassword } from '../user/utils';
import { DEFAULT_GROUP_INCLUDE } from './const';

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromSession();
    if (user?.role !== 'ADMIN') {
      return handleFail({ message: 'Unable to create group', status: HttpStatusCode.Unauthorized });
    }
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
      include: DEFAULT_GROUP_INCLUDE,
    });
    return handleSuccess({ data: createdGroup, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
