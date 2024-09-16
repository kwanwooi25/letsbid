import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GroupWithMembersAsUsers } from '@/types/group';
import { LucideCrown, LucideMessageCircle, LucideUser2 } from 'lucide-react';

export default function MemberListItem({ member, isHost, isMe }: Props) {
  return (
    <li className="flex items-center justify-between p-4 border border-primary/30 rounded-sm hover:bg-primary-foreground hover:cursor-pointer transition-colors">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={member.user.image ?? undefined} />
          <AvatarFallback>
            <LucideUser2 />
          </AvatarFallback>
        </Avatar>
        <span>{member.user.name}</span>
        {isMe && (
          <div className="relative">
            <LucideMessageCircle className="w-8 h-8 text-green-500 dark:text-green-700" />
            <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-xs font-bold text-green-500 dark:text-green-700">
              ME
            </span>
          </div>
        )}
      </div>

      {isHost && (
        <Avatar>
          <AvatarFallback>
            <LucideCrown className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </li>
  );
}

type Props = {
  member: GroupWithMembersAsUsers['members'][number];
  isHost?: boolean;
  isMe?: boolean;
};
