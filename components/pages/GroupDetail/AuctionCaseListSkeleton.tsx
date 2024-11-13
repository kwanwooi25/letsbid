'use client';

import List from '@/components/List';
import AuctionCaseListItemSkeleton from './AuctionCaseListItemSkeleton';

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
