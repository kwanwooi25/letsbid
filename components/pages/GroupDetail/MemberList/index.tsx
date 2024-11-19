'use client';

import List from '@/components/common/List';
import { GroupWithMembersAsUsers } from '@/features/group/types';
import MemberListItem from './ListItem';

export default function MemberList({ group }: Props) {
  const { members } = group;

  return (
    <List>
      {members.map((member) => (
        <MemberListItem key={member.userId} member={member} group={group} />
      ))}
    </List>
  );
}

type Props = {
  group: GroupWithMembersAsUsers;
};
