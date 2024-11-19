import { handleFail, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { hashPassword } from '../utils';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      omit: { password: false },
    });
    if (!user) {
      return handleFail({
        status: HttpStatusCode.Unauthorized,
        message: '로그인 정보가 올바르지 않습니다',
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...passwordExcludedUser } = user;

    if (user && password === hashPassword(data.password)) {
      return handleSuccess({ data: passwordExcludedUser });
    }
    return handleFail({
      status: HttpStatusCode.Unauthorized,
      message: '로그인 정보가 올바르지 않습니다',
    });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
