'use client';

import { Button } from '@/components/ui/button';
import { useFormDialog } from '@/context/FormDialog';
import { GroupWithMembersAsUsers } from '@/types/group';
import { LucideUserPlus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import MemberListItem from './MemberListItem';

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
        {members.map((member) => (
          <MemberListItem
            key={member.userId}
            member={member}
            isHost={member.userId === hostId}
            isMe={member.userId === session?.data?.user?.id}
          />
        ))}
      </ul>
    </div>
  );
}

type Props = {
  isHost?: boolean;
  group: GroupWithMembersAsUsers;
};
