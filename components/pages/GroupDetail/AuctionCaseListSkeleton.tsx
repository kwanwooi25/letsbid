'use client';

import AuctionCaseListItemSkeleton from './AuctionCaseListItemSkeleton';

export default function AuctionCaseListSkeleton({ count = 5 }: Props) {
  return (
    <ul className="flex flex-col gap-4">
      {Array.from(Array(count)).map((n, i) => (
        <AuctionCaseListItemSkeleton key={`${n}_${i}`} />
      ))}
    </ul>
  );
}

type Props = {
  count?: number;
};
