'use client';

import List from '@/components/List';
import ArticleListItemSkeleton from './ListItem.skeleton';

export default function ArticleListSkeleton({ count = 5 }: Props) {
  return (
    <List>
      {Array.from(Array(count)).map((n, i) => (
        <ArticleListItemSkeleton key={`${n}_${i}`} />
      ))}
    </List>
  );
}

type Props = {
  count?: number;
};
