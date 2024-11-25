'use client';

import ListItem from '@/components/common/ListItem';
import UserImage from '@/components/common/UserImage';
import { Chip } from '@/components/ui/chip';
import ArticleDetailMenu from '@/features/article/ArticleDetailMenu';
import { ArticleWithAuctionCaseAuthor } from '@/features/article/types';
import { formatDateTime } from '@/lib/datetime';
import { cn } from '@/lib/utils';
import { ThumbsUp } from 'lucide-react';
import { useAuctionCaseDetailRouter } from '../useAuctionCaseDetailRouter';

export default function ArticleListItem({ article }: Props) {
  const { id, title, contentHtml, author, updatedAt, isPublished, auctionCase, _count } = article;
  const { likes } = _count;

  const { moveToArticleDetail } = useAuctionCaseDetailRouter({ auctionCase });

  const handleClick = () => {
    if (!isPublished) return;

    moveToArticleDetail(id);
  };

  return (
    <ListItem
      className={cn('flex-col', !isPublished && 'opacity-85 border-dashed')}
      onClick={handleClick}
    >
      <div className="w-full flex items-center justify-between gap-4">
        <div className="text-base min-h-[24px] sm:text-lg sm:min-h-[28px] font-bold flex items-center gap-2">
          {!isPublished && (
            <Chip className="text-sm text-secondary-foreground/50" size="sm" variant="secondary">
              임시저장
            </Chip>
          )}
          <span>{title}</span>
        </div>

        {isPublished && (
          <div className="flex items-center gap-4">
            {likes > 0 && (
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm font-semibold text-primary/70">{likes}</span>
              </div>
            )}
            <div className="mt-auto flex items-center gap-2">
              <UserImage src={author.image} size={24} />
              <span className="text-xs sm:text-sm font-semibold text-primary/70">
                {author.name}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex items-center gap-4">
        <div className="flex flex-col gap-2 flex-1 items-start">
          <div
            className="text-xs min-h-[16px] sm:text-sm sm:min-h-[20px] font-semibold text-primary/70 line-clamp-1"
            dangerouslySetInnerHTML={{ __html: contentHtml?.replace(/<img(.*?)>/gi, '') ?? '' }}
          />
          <div className="text-xs min-h-[16px] sm:text-sm sm:min-h-[20px] text-primary/50">
            {formatDateTime(updatedAt, 'yyyy. MM. dd. HH:mm')}
          </div>
        </div>

        <ArticleDetailMenu className="shrink-0" article={article} />
      </div>
    </ListItem>
  );
}

type Props = {
  article: ArticleWithAuctionCaseAuthor;
};
