import HostBadge from '@/components/HostBadge';
import ListItem from '@/components/ListItem';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsGroupHost } from '@/hooks/useIsGroupHost';
import { GroupWithMembersAsUsers } from '@/types/group';
import { LucideMessageCircle, LucideUser2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function MemberListItem({ member, groupHostId }: Props) {
  const session = useSession();
  const { isGroupHost } = useIsGroupHost(groupHostId, member.userId);
  const { user, userId } = member;
  const isMe = session?.data?.user?.id === userId;

  return (
    <ListItem color={isMe ? 'green' : undefined}>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback>
            <LucideUser2 />
          </AvatarFallback>
        </Avatar>
        <span>{user.name}</span>
        {isMe && (
          <div className="relative translate-y-[-8px] rotate-[10deg]">
            <LucideMessageCircle className="w-8 h-8" />
            <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-xs font-bold">
              ME
            </span>
          </div>
        )}
      </div>

      {isGroupHost && <HostBadge />}
    </ListItem>
  );
}

type Props = {
  member: GroupWithMembersAsUsers['members'][number];
  groupHostId: string;
};
