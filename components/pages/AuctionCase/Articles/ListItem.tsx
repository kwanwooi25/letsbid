'use client';

import ListItem from '@/components/ListItem';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import UserImage from '@/components/UserImage';
import { formatDateTime } from '@/lib/datetime';
import { cn } from '@/lib/utils';
import { ArticleWithAuctionCaseAuthorAttachments } from '@/types/article';
import { useAuctionCaseDetailActions } from '../useAuctionCaseDetailActions';
import { useAuctionCaseDetailRouter } from '../useAuctionCaseDetailRouter';

export default function ArticleListItem({ article }: Props) {
  const { id, title, contentHtml, author, updatedAt, isPublished, auctionCase } = article;

  const { moveToArticleDetail, moveToEditArticle } = useAuctionCaseDetailRouter({ auctionCase });
  const { tryToDeleteArticle } = useAuctionCaseDetailActions({ auctionCase });

  const handleClick = () => {
    if (!isPublished) return;

    moveToArticleDetail(id);
  };

  return (
    <ListItem
      className={cn('min-h-[98px] sm:min-h-[114px]', !isPublished && 'opacity-90 border-dashed')}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-2 flex-1 items-start">
        <div className="text-base min-h-[24px] sm:text-lg sm:min-h-[28px] font-bold flex items-center gap-2">
          {!isPublished && (
            <Chip className="text-sm text-secondary-foreground/50" size="sm" variant="secondary">
              임시저장
            </Chip>
          )}
          <span>{title}</span>
        </div>
        <div
          className="text-xs min-h-[16px] sm:text-sm sm:min-h-[20px] font-semibold text-primary/70 line-clamp-1"
          dangerouslySetInnerHTML={{ __html: contentHtml?.replace(/<img(.*?)>/gi, '') ?? '' }}
        />
        {isPublished && (
          <div className="text-xs min-h-[16px] sm:text-sm sm:min-h-[20px] text-primary/50">
            {formatDateTime(updatedAt, 'yyyy. MM. dd. HH:mm')}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 self-end">
        {isPublished ? (
          <>
            <UserImage src={author.image} size={24} />
            <span className="text-xs sm:text-sm font-semibold text-primary/70">{author.name}</span>
          </>
        ) : (
          <>
            <Button type="button" onClick={() => moveToEditArticle(id)}>
              수정
            </Button>
            <Button type="button" variant="destructive" onClick={() => tryToDeleteArticle(article)}>
              삭제
            </Button>
          </>
        )}
      </div>
    </ListItem>
  );
}

type Props = {
  article: ArticleWithAuctionCaseAuthorAttachments;
};