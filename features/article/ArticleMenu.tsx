'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { LucideEdit2, LucideMoreVertical, LucideTrash2 } from 'lucide-react';
import { HTMLAttributes, ReactNode } from 'react';
import { ArticleWithAuctionCaseAuthor } from './types';
import { useArticleActions } from './useArticleActions';
import { useArticleRouter } from './useArticleRouter';

export default function ArticleMenu({ className, trigger, triggerClassName, article }: Props) {
  const { loggedInUser } = useLoggedInUser();
  const { moveToEditArticle } = useArticleRouter();
  const { tryToDeleteArticle } = useArticleActions();

  const isMyArticle = loggedInUser?.id === article.authorId;

  if (!isMyArticle) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button className={triggerClassName} variant="ghost" size="icon">
            <LucideMoreVertical className="w-6 h-6" />
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className={className}>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            moveToEditArticle(article);
          }}
        >
          <LucideEdit2 className="mr-2 h-4 w-4" />
          <span>조사 내용 수정</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            tryToDeleteArticle(article);
          }}
        >
          <LucideTrash2 className="mr-2 h-4 w-4" />
          <span>조사 내용 삭제</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type Props =
  | {
      className?: string;
      trigger?: ReactNode;
      triggerClassName?: never;
      article: ArticleWithAuctionCaseAuthor;
    }
  | {
      className?: string;
      trigger?: never;
      triggerClassName?: HTMLAttributes<HTMLButtonElement>['className'];
      article: ArticleWithAuctionCaseAuthor;
    };
