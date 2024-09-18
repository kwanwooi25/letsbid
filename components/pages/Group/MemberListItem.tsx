import HostBadge from '@/components/HostBadge';
import ListItem from '@/components/ListItem';
import MeBadge from '@/components/MeBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsGroupHost } from '@/hooks/useIsGroupHost';
import { GroupWithMembersAsUsers } from '@/types/group';
import { LucideUser2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function MemberListItem({ member, groupHostId }: Props) {
  const session = useSession();
  const { isGroupHost } = useIsGroupHost(groupHostId, member.userId);
  const { user, userId } = member;
  const isMe = session?.data?.user?.id === userId;

  return (
    <ListItem>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback>
            <LucideUser2 />
          </AvatarFallback>
        </Avatar>
        <span>{user.name}</span>
        {isMe && <MeBadge />}
      </div>

      {isGroupHost && <HostBadge />}
    </ListItem>
  );
}

type Props = {
  member: GroupWithMembersAsUsers['members'][number];
  groupHostId: string;
};
