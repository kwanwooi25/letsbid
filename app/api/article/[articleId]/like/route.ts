import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    const user = await getUserFromSession();
    const [totalLikeCount, likeOfMe] = await prisma.$transaction([
      prisma.likeOnArticle.count({ where: { articleId: params.articleId } }),
      prisma.likeOnArticle.count({ where: { userId: user?.id, articleId: params.articleId } }),
    ]);
    return handleSuccess({ data: { totalLikeCount, isMeLiked: !!likeOfMe } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function POST(req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    const user = await getUserFromSession();
    const createdLikeOnArticle = await prisma.likeOnArticle.create({
      data: {
        userId: user?.id!,
        articleId: params.articleId,
      },
    });
    return handleSuccess({ data: createdLikeOnArticle, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    const user = await getUserFromSession();
    await getUserFromSession();
    await prisma.likeOnArticle.deleteMany({
      where: { userId: user?.id, articleId: params.articleId },
    });
    return handleSuccess({ data: { userId: user?.id, articleId: params.articleId } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
