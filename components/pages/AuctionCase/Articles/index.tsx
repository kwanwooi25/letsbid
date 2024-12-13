'use client';

import List from '@/components/common/List';
import ListEmpty from '@/components/common/ListEmpty';
import { Button } from '@/components/ui/button';
import { getAuctionCaseArticleListQueryOptions } from '@/features/article/query';
import { useArticleRouter } from '@/features/article/hooks/useArticleRouter';
import { AuctionCaseLike } from '@/features/auction-case/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { LucideNotebookPen } from 'lucide-react';
import ArticleListItem from './ListItem';

export default function ArticleList({ auctionCase }: Props) {
  const { moveToAddArticle } = useArticleRouter();
  const { data: articles, isPending } = useSuspenseQuery(
    getAuctionCaseArticleListQueryOptions(auctionCase?.id),
  );

  if (!isPending && !articles.length) {
    return (
      <ListEmpty className="flex flex-col gap-4">
        <p>조사 내용이 없습니다</p>
        <p>
          가장 먼저{' '}
          <Button className="self-end" onClick={() => moveToAddArticle(auctionCase)}>
            <LucideNotebookPen className="w-4 h-4 mr-2" />
            조사 내용을 등록
          </Button>{' '}
          해보세요
        </p>
      </ListEmpty>
    );
  }

  return (
    <List>
      {articles.map((article) => (
        <ArticleListItem key={article.id} article={article} />
      ))}
    </List>
  );
}

type Props = {
  auctionCase?: AuctionCaseLike | null;
};
