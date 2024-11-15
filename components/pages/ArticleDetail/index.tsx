'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import UserImage from '@/components/UserImage';
import { formatDateTime } from '@/lib/datetime';
import { getArticleDetailQueryOptions } from '@/queries/article/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Viewer } from '@toast-ui/react-editor';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

export default function ArticleDetail() {
  const session = useSession();
  const params = useParams();
  const articleId = params.articleId as string;
  const { data: article } = useSuspenseQuery(getArticleDetailQueryOptions(articleId));

  if (!article) return null;

  const { auctionCase, title, contentHtml, author, updatedAt } = article;
  const isMyArticle = author.id === session?.data?.user.id;

  return (
    <>
      <PageHeader
        className="max-w-3xl"
        title={
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold">조사 내용</span>
            <span className="text-sm font-semibold opacity-50">{auctionCase!.caseName}</span>
          </div>
        }
        backButton
      >
        {isMyArticle && (
          <div className="flex items-center gap-2">
            <Button type="button">수정</Button>
            <Button type="button" variant="destructive">
              삭제
            </Button>
          </div>
        )}
      </PageHeader>
      <PageBody className="max-w-3xl flex flex-col gap-4">
        <h6 className="text-xl font-bold">{title}</h6>
        <div className="self-end flex items-center gap-2">
          <UserImage src={author.image} size={24} />
          <span className="text-sm font-semibold text-primary/70">{author.name}</span>
        </div>
        <span className="self-end text-sm text-primary/50">
          최종 업데이트: {formatDateTime(updatedAt, 'yyyy. MM. dd. HH:mm')}
        </span>
        <Viewer width="100%" initialValue={contentHtml} />
      </PageBody>
    </>
  );
}
