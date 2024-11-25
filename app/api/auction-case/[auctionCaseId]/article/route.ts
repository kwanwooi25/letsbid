import { DEFAULT_ARTICLE_INCLUDE } from '@/app/api/article/const';
import {
  getUserFromSession,
  handleFail,
  handlePrismaClientError,
  handleSuccess,
} from '@/app/api/utils';
import { ArticleFormSchema } from '@/components/pages/ArticleForm/formSchema';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { auctionCaseId: string } }) {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return handleFail({ message: 'User not found', status: HttpStatusCode.Unauthorized });
    }

    const data = (await req.json()) as ArticleFormSchema;
    const createdArticle = await prisma.article.create({
      data: {
        ...data,
        auctionCaseId: params.auctionCaseId,
        authorId: user.id,
      },
      include: DEFAULT_ARTICLE_INCLUDE,
    });
    return handleSuccess({ data: createdArticle, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function GET(req: NextRequest, { params }: { params: { auctionCaseId: string } }) {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return handleFail({ message: 'User not found!', status: HttpStatusCode.Unauthorized });
    }

    const articles = await prisma.article.findMany({
      where: {
        auctionCaseId: params.auctionCaseId,
        OR: [{ isPublished: true }, { isPublished: false, authorId: { equals: user?.id } }],
      },
      include: DEFAULT_ARTICLE_INCLUDE,
      orderBy: [{ isPublished: 'asc' }, { updatedAt: 'desc' }],
    });
    return handleSuccess({ data: articles });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
