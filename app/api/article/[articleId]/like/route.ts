import { handleFail, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { auth } from '@/features/auth';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';

export const GET = auth(async function GET(req, { params }) {
  try {
    const user = req.auth?.user;
    const articleId = String(params?.articleId);

    const [totalLikeCount, likeOfMe] = await prisma.$transaction([
      prisma.likeOnArticle.count({ where: { articleId } }),
      prisma.likeOnArticle.count({ where: { userId: user?.id, articleId } }),
    ]);
    return handleSuccess({ data: { totalLikeCount, isMeLiked: !!likeOfMe } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});

export const POST = auth(async function POST(req, { params }) {
  try {
    const user = req.auth?.user;
    const articleId = String(params?.articleId);
    if (!user) {
      return handleFail({ status: HttpStatusCode.Unauthorized });
    }

    const createdLikeOnArticle = await prisma.likeOnArticle.create({
      data: {
        userId: user.id,
        articleId,
      },
    });
    return handleSuccess({ data: createdLikeOnArticle, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});

export const DELETE = auth(async function DELETE(req, { params }) {
  try {
    const user = req.auth?.user;
    const articleId = String(params?.articleId);

    await prisma.likeOnArticle.deleteMany({
      where: { userId: user?.id, articleId },
    });
    return handleSuccess({ data: { userId: user?.id, articleId } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});
