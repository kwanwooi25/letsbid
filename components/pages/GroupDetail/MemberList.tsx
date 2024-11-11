'use client';

import { GroupWithMembersAsUsers } from '@/types/group';
import MemberListItem from './MemberListItem';

export default function MemberList({ group }: Props) {
  const { members } = group;

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="min-h-[40px] flex items-center justify-between">
        <span>
          전체 멤버수: <b className="text-lg font-bold">{members.length.toLocaleString()}</b>명
        </span>
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
  group: GroupWithMembersAsUsers;
};
