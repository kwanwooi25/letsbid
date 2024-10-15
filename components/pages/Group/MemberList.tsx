'use client';

import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { GroupWithMembersAsUsers } from '@/types/group';
import { LucideUserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MemberListItem from './MemberListItem';

export default function MemberList({ isGroupHost, group }: Props) {
  const router = useRouter();
  const currentUrl = useCurrentUrl();
  const { members } = group;

  const handleClickInvite = () => {
    router.push(`${PATHS.GROUP}/${group.id}${PATHS.INVITE_MEMBERS}?callbackUrl=${currentUrl}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="min-h-[40px] flex items-center justify-between">
        <span>
          전체 멤버수: <b className="text-lg font-bold">{members.length.toLocaleString()}</b>명
        </span>
        {isGroupHost && (
          <Button className="justify-self-end" onClick={handleClickInvite}>
            <LucideUserPlus className="w-4 h-4 mr-2" />
            멤버 초대
          </Button>
        )}
      </div>

      <ul className="flex flex-col gap-4">
        {members.map((member) => (
          <MemberListItem key={member.userId} member={member} group={group} />
        ))}
      </ul>
    </div>
  );
}

type Props = {
  isGroupHost?: boolean;
  group: GroupWithMembersAsUsers;
};
