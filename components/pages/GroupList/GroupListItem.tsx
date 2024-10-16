'use client';

import HostBadge from '@/components/HostBadge';
import ListItem from '@/components/ListItem';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { cn } from '@/lib/utils';
import { GroupWithMembers } from '@/types/group';
import { LucideLock, LucideLockOpen } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function GroupListItem({ group, isHost }: Props) {
  const session = useSession();
  const router = useRouter();

  const { id, name, members, maxMembers, isPrivate } = group;
  const isJoinable =
    members.filter((member) => member.userId === session?.data?.user.id).length === 0;

  const moveToGroup = () => router.push(`${PATHS.GROUP}/${id}`, { scroll: false });

  const handleClickJoin = () => {
    // TODO
    console.log('join', id);
  };

  return (
    <ListItem
      className={cn('min-h-[86px]', isJoinable && 'hover:cursor-default')}
      onClick={isJoinable ? undefined : moveToGroup}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-2 min-h-[32px]">
          <span className="text-xl font-semibold">{name}</span>
          {isPrivate ? (
            <div className="w-[32px] h-[32px] rounded-full bg-destructive/20 flex items-center justify-center">
              <LucideLock className="w-4 h-4 text-destructive" />
            </div>
          ) : (
            <div className="w-[32px] h-[32px] rounded-full bg-green-100 flex items-center justify-center">
              <LucideLockOpen className="w-4 h-4 text-green-700" />
            </div>
          )}
        </div>
        <span className="text-sm font-semibold text-primary/50">
          {members.length.toLocaleString()}/{maxMembers.toLocaleString()}
        </span>
      </div>

      {isHost && <HostBadge />}

      {isJoinable && (
        <Button onClick={handleClickJoin} type="button">
          참여하기
        </Button>
      )}
    </ListItem>
  );
}

type Props = {
  group: GroupWithMembers;
  isHost?: boolean;
};
