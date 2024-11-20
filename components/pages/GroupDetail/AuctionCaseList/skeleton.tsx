'use client';

import List from '@/components/common/List';
import AuctionCaseListItemSkeleton from './ListItem.skeleton';

export default function AuctionCaseListSkeleton({ count = 5 }: Props) {
  return (
    <List>
      {Array.from(Array(count)).map((n, i) => (
        <AuctionCaseListItemSkeleton key={`${n}_${i}`} />
      ))}
    </List>
  );
}

type Props = {
  count?: number;
};
