import { handleFail, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { hashPassword } from '../utils';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (user && user.password === hashPassword(data.password)) {
      return handleSuccess({ data: user });
    }
    return handleFail({
      status: HttpStatusCode.Unauthorized,
      message: '로그인 정보가 올바르지 않습니다',
    });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
