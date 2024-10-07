'use client';

import HostBadge from '@/components/HostBadge';
import ListItem from '@/components/ListItem';
import { PATHS } from '@/const/paths';
import { GroupWithMembers } from '@/types/group';
import { useRouter } from 'next/navigation';

export default function GroupListItem({ group, isHost }: Props) {
  const router = useRouter();

  const moveToGroup = () => router.push(`${PATHS.GROUP}/${group.id}`, { scroll: false });

  return (
    <ListItem className="min-h-[74px]" onClick={moveToGroup}>
      <span className="text-xl font-semibold">{group.name}</span>
      {isHost && <HostBadge />}
    </ListItem>
  );
}

type Props = {
  group: GroupWithMembers;
  isHost?: boolean;
};
