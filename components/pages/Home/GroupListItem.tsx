'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PATHS } from '@/const/paths';
import { GroupWithMembers } from '@/types/group';
import { LucideCrown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GroupListItem({ group, isHost }: Props) {
  const router = useRouter();

  const moveToGroup = () => router.push(`${PATHS.GROUP}/${group.id}`);

  return (
    <li
      className="flex items-center justify-between p-4 border border-primary/30 rounded-sm hover:bg-primary-foreground hover:cursor-pointer transition-colors"
      onClick={moveToGroup}
    >
      <span className="text-xl font-semibold">{group.name}</span>
      {isHost && (
        <Avatar>
          <AvatarFallback>
            <LucideCrown size={18} />
          </AvatarFallback>
        </Avatar>
      )}
    </li>
  );
}

type Props = {
  group: GroupWithMembers;
  isHost?: boolean;
};
