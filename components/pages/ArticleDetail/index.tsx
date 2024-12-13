'use client';

import UserImage from '@/components/common/UserImage';
import WysiwygViewer from '@/components/common/WysiwygViewer';
import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import {
  getArticleDetailQueryOptions,
  getLikesOnArticleQueryOptions,
  getViewsOnArticleQueryOptions,
  likeArticleMutaionOptions,
  unlikeArticleMutaionOptions,
  useArticleRouter,
  viewArticleMutaionOptions,
} from '@/features/article';
import ArticleMenu from '@/features/article/components/ArticleMenu';
import { formatDateTime } from '@/lib/datetime';
import { cn } from '@/lib/utils';
import { useMutation, useSuspenseQueries } from '@tanstack/react-query';
import { ThumbsUp } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ArticleDetail() {
  const params = useParams();
  const articleId = params.articleId as string;
  const auctionCaseId = params.auctionCaseId as string;
  const { resolvedTheme } = useTheme();
  const [{ data: article }, { data: likesOnArticle }, { data: viewsOnArticle }] =
    useSuspenseQueries({
      queries: [
        getArticleDetailQueryOptions(articleId),
        getLikesOnArticleQueryOptions(articleId),
        getViewsOnArticleQueryOptions(articleId),
      ],
    });
  const { totalLikeCount = 0, isMeLiked = false } = likesOnArticle ?? {};
  const { isMeViewed = false } = viewsOnArticle ?? {};

  const { mutateAsync: likeArticle } = useMutation(likeArticleMutaionOptions);
  const { mutateAsync: unlikeArticle } = useMutation(unlikeArticleMutaionOptions);
  const { mutateAsync: viewArticle } = useMutation(viewArticleMutaionOptions);

  const { moveToArticleList } = useArticleRouter();

  useEffect(() => {
    if (!isMeViewed) {
      viewArticle({ articleId, auctionCaseId });
    }
  }, [articleId, auctionCaseId, isMeViewed, viewArticle]);

  if (!article) return null;

  const { isPublished, auctionCase, title, contentHtml, author, updatedAt } = article;

  const toggleLike = () => {
    const action = isMeLiked ? unlikeArticle : likeArticle;
    action({ articleId, auctionCaseId });
  };

  return (
    <div className="max-w-2xl lg:max-w-5xl mx-auto">
      <PageHeader
        className="lg:mx-[176px]"
        backButton
        onBackButtonClick={() => moveToArticleList(auctionCase)}
        title={
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 font-bold">
              {!isPublished && (
                <Chip
                  className="text-sm text-secondary-foreground/50"
                  size="sm"
                  variant="secondary"
                >
                  임시저장
                </Chip>
              )}
              <span className="text-lg">조사 내용</span>
            </div>
            <span className="text-sm font-semibold opacity-50">{auctionCase!.caseName}</span>
          </div>
        }
      >
        <ArticleMenu article={article} />
      </PageHeader>
      <PageBody className="lg:mx-[176px] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h6 className="text-xl font-bold">{title}</h6>
          <div className="flex items-center gap-2">
            {!!totalLikeCount && (
              <span className="text-sm font-semibold text-foreground/70">{totalLikeCount}</span>
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
          <span className="text-sm font-semibold text-foreground/70">{author.name}</span>
        </div>
        <span className="self-end text-sm text-foreground/50">
          최종 업데이트: {formatDateTime(updatedAt, 'yyyy. MM. dd. HH:mm')}
        </span>
        <WysiwygViewer key={contentHtml} width="100%" initialValue={contentHtml} />
      </PageBody>
    </div>
  );
}
