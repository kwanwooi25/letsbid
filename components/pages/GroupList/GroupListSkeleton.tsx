'use client';

import GroupListItemSkeleton from './GroupListItemSkeleton';

export default function GroupListSkeleton({ count = 5 }: Props) {
  return (
    <ul className="flex flex-col gap-4">
      {Array.from(Array(count)).map((n, i) => (
        <GroupListItemSkeleton key={`${n}_${i}`} />
      ))}
    </ul>
  );
}

type Props = {
  count?: number;
};
