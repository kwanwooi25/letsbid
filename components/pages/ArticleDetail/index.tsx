'use client';

import UserImage from '@/components/common/UserImage';
import WysiwygViewer from '@/components/common/WysiwygViewer';
import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import { Button } from '@/components/ui/button';
import ArticleMenu from '@/features/article/ArticleMenu';
import {
  likeArticleMutaionOptions,
  unlikeArticleMutaionOptions,
} from '@/features/article/mutation';
import {
  getArticleDetailQueryOptions,
  getLikesOnArticleQueryOptions,
} from '@/features/article/query';
import { formatDateTime } from '@/lib/datetime';
import { cn } from '@/lib/utils';
import { useMutation, useSuspenseQueries } from '@tanstack/react-query';
import { ThumbsUp } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useParams } from 'next/navigation';

export default function ArticleDetail() {
  const params = useParams();
  const articleId = params.articleId as string;
  const auctionCaseId = params.auctionCaseId as string;
  const { resolvedTheme } = useTheme();
  const [{ data: article }, { data: likesOnArticle }] = useSuspenseQueries({
    queries: [getArticleDetailQueryOptions(articleId), getLikesOnArticleQueryOptions(articleId)],
  });
  const { totalLikeCount = 0, isMeLiked = false } = likesOnArticle ?? {};

  const { mutateAsync: likeArticle } = useMutation(likeArticleMutaionOptions);
  const { mutateAsync: unlikeArticle } = useMutation(unlikeArticleMutaionOptions);

  if (!article) return null;

  const { auctionCase, title, contentHtml, author, updatedAt } = article;

  const toggleLike = () => {
    const action = isMeLiked ? unlikeArticle : likeArticle;
    action({ articleId, auctionCaseId });
  };

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
        <ArticleMenu article={article} />
      </PageHeader>
      <PageBody className="max-w-3xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h6 className="text-xl font-bold">{title}</h6>
          <div className="flex items-center gap-2">
            {!!totalLikeCount && (
              <span className="text-sm font-semibold text-primary/70">{totalLikeCount}</span>
            )}
            <Button
              onClick={toggleLike}
              className="rounded-full"
              type="button"
              variant="ghost"
              size="icon"
            >
              <ThumbsUp
                className={cn('w-5 h-5', isMeLiked ? 'animate-like' : 'animate-unlike')}
                fill={
                  isMeLiked ? (resolvedTheme === 'dark' ? '#075985' : '#bae6fd') : 'transparent'
                }
              />
            </Button>
          </div>
        </div>
        <div className="self-end flex items-center gap-2">
          <UserImage src={author.image} size={24} />
          <span className="text-sm font-semibold text-primary/70">{author.name}</span>
        </div>
        <span className="self-end text-sm text-primary/50">
          최종 업데이트: {formatDateTime(updatedAt, 'yyyy. MM. dd. HH:mm')}
        </span>
        <WysiwygViewer key={contentHtml} width="100%" initialValue={contentHtml} />
      </PageBody>
    </>
  );
}
