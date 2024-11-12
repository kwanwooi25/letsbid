'use client';

import List from '@/components/List';
import MemberListItemSkeleton from './MemberListItemSkeleton';

export default function MemberListSkeleton({ count = 5 }: Props) {
  return (
    <List>
      {Array.from(Array(count)).map((n, i) => (
        <MemberListItemSkeleton key={`${n}_${i}`} />
      ))}
    </List>
  );
}

type Props = {
  count?: number;
};
