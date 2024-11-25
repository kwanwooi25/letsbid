import {
  getUserFromSession,
  handleFail,
  handlePrismaClientError,
  handleSuccess,
} from '@/app/api/utils';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return handleFail({
        message: 'User not found!',
        status: HttpStatusCode.Unauthorized,
      });
    }

    const [totalViewCount, viewOfMe] = await prisma.$transaction([
      prisma.viewOnArticle.count({ where: { articleId: params.articleId } }),
      prisma.viewOnArticle.count({ where: { userId: user?.id, articleId: params.articleId } }),
    ]);
    return handleSuccess({ data: { totalViewCount, isMeViewed: !!viewOfMe } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function POST(req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return handleFail({
        message: 'User not found!',
        status: HttpStatusCode.Unauthorized,
      });
    }

    const createdViewOnArticle = await prisma.viewOnArticle.create({
      data: {
        userId: user.id,
        articleId: params.articleId,
      },
    });
    return handleSuccess({ data: createdViewOnArticle, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return handleFail({
        message: 'User not found!',
        status: HttpStatusCode.Unauthorized,
      });
    }

    await prisma.viewOnArticle.deleteMany({
      where: { userId: user?.id, articleId: params.articleId },
    });
    return handleSuccess({ data: { userId: user?.id, articleId: params.articleId } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
