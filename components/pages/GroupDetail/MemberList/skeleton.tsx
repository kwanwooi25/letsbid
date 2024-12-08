'use client';

import List from '@/components/common/List';
import MemberListItemSkeleton from './ListItem.skeleton';

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
