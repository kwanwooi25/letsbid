'use client';

import ListItem from '@/components/ListItem';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PATHS } from '@/const/paths';
import { GroupWithMembers } from '@/types/group';
import { LucideCrown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GroupListItem({ group, isHost }: Props) {
  const router = useRouter();

  const moveToGroup = () => router.push(`${PATHS.GROUP}/${group.id}`);

  return (
    <ListItem className="min-h-[74px]" color={isHost ? 'green' : undefined} onClick={moveToGroup}>
      <span className="text-xl font-semibold">{group.name}</span>
      {isHost && (
        <Avatar>
          <AvatarFallback className="bg-inherit">
            <LucideCrown size={18} />
          </AvatarFallback>
        </Avatar>
      )}
    </ListItem>
  );
}

type Props = {
  group: GroupWithMembers;
  isHost?: boolean;
};
