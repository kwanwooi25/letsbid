'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useFormDialog } from '@/context/FormDialog';
import { GroupWithMembersAsUsers } from '@/types/group';
import { LucideCrown, LucideMessageCircle, LucideUserPlus } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function MemberList({ isHost: isMeHost, group }: Props) {
  const session = useSession();
  const { openForm } = useFormDialog();
  const { members, hostId } = group;

  const handleClickInvite = () => {
    openForm({
      type: 'INVITATION',
      formProps: { group },
    });
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      {isMeHost && (
        <Button className="self-end" onClick={handleClickInvite}>
          <LucideUserPlus className="w-4 h-4 mr-2" />
          멤버 초대
        </Button>
      )}

      <ul className="flex flex-col gap-4">
        {members.map((member) => {
          const isHost = member.userId === hostId;
          const isMe = member.userId === session?.data?.user?.id;

          return (
            <li
              key={member.userId}
              className="flex items-center justify-between p-4 border border-primary/30 rounded-sm hover:bg-primary-foreground hover:cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={member.user.image ?? undefined} />
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
        })}
      </ul>
    </div>
  );
}

type Props = {
  isHost?: boolean;
  group: GroupWithMembersAsUsers;
};
