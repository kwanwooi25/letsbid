import ListItem from '@/components/ListItem';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GroupWithMembersAsUsers } from '@/types/group';
import { LucideCrown, LucideMessageCircle, LucideUser2 } from 'lucide-react';

export default function MemberListItem({ member, isHost, isMe }: Props) {
  return (
    <ListItem color={isMe ? 'green' : undefined}>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={member.user.image ?? undefined} />
          <AvatarFallback>
            <LucideUser2 />
          </AvatarFallback>
        </Avatar>
        <span>{member.user.name}</span>
        {isMe && (
          <div className="relative translate-y-[-8px] rotate-[10deg]">
            <LucideMessageCircle className="w-8 h-8" />
            <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-xs font-bold">
              ME
            </span>
          </div>
        )}
      </div>

      {isHost && (
        <Avatar>
          <AvatarFallback className="bg-inherit">
            <LucideCrown className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </ListItem>
  );
}

type Props = {
  member: GroupWithMembersAsUsers['members'][number];
  isHost?: boolean;
  isMe?: boolean;
};
