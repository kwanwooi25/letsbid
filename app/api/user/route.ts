import { SignUpFormSchema } from '@/components/pages/SignUpForm/formSchema';
import { handleFail, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { hashPassword } from './utils';

export async function POST(req: NextRequest) {
  try {
    const data: SignUpFormSchema = await req.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, passwordConfirm, ...rest } = data;
    const createdUser = await prisma.user.create({
      data: {
        ...rest,
        password: hashPassword(data.password),
      },
    });
    return handleSuccess({ data: createdUser, status: HttpStatusCode.Created });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return handleFail({
        status: HttpStatusCode.BadRequest,
        message: '이미 가입된 이메일입니다',
      });
    }
    return handlePrismaClientError(e);
  }
}
