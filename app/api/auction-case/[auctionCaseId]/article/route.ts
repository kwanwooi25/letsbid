import { ArticleFormSchema } from '@/components/pages/ArticleForm/formSchema';
import {
  getUserFromSession,
  handleFail,
  handlePrismaClientError,
  handleSuccess,
} from '@/app/api/utils';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { auctionCaseId: string } }) {
  try {
    const user = await getUserFromSession();
    const data = (await req.json()) as ArticleFormSchema;
    if (!user) {
      return handleFail({ message: 'User not found', status: HttpStatusCode.BadRequest });
    }

    const createdArticle = await prisma.article.create({
      data: {
        ...data,
        auctionCaseId: params.auctionCaseId,
        authorId: user.id,
      },
    });
    return handleSuccess({ data: createdArticle, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function GET(req: NextRequest, { params }: { params: { auctionCaseId: string } }) {
  try {
    const user = await getUserFromSession();
    const articles = await prisma.article.findMany({
      where: {
        auctionCaseId: params.auctionCaseId,
        OR: [{ isPublished: true }, { isPublished: false, authorId: user?.id }],
      },
      include: {
        author: true,
        attachments: true,
        auctionCase: true,
      },
      orderBy: [{ isPublished: 'asc' }, { updatedAt: 'desc' }],
    });
    return handleSuccess({ data: articles });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
