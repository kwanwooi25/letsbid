import List from '@/components/List';
import ListEmpty from '@/components/ListEmpty';
import { Button } from '@/components/ui/button';
import { getAuctionCaseArticleListQueryOptions } from '@/queries/article/query';
import { AuctionCaseLike } from '@/types/auctionCase';
import { useSuspenseQuery } from '@tanstack/react-query';
import { LucideNotebookPen } from 'lucide-react';
import { useAuctionCaseDetailRouter } from '../useAuctionCaseDetailRouter';
import ArticleListItem from './ListItem';

export default function ArticleList({ auctionCase }: Props) {
  const { moveToAddArticle } = useAuctionCaseDetailRouter({ auctionCase });
  const { data: articles } = useSuspenseQuery(
    getAuctionCaseArticleListQueryOptions(auctionCase?.id),
  );

  if (!articles.length) {
    return (
      <ListEmpty className="flex flex-col gap-4">
        <p>조사 내용이 없습니다</p>
        <p>
          가장 먼저{' '}
          <Button className="self-end" onClick={moveToAddArticle}>
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