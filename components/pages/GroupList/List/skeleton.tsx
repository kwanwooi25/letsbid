'use client';

import List from '@/components/common/List';
import GroupListItemSkeleton from './GroupListItem.skeleton';

export default function GroupListSkeleton({ count = 5 }: Props) {
  return (
    <List>
      {Array.from(Array(count)).map((n, i) => (
        <GroupListItemSkeleton key={`${n}_${i}`} />
      ))}
    </List>
  );
}

type Props = {
  count?: number;
};
