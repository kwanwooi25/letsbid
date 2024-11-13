'use client';

import List from '@/components/List';
import { GroupWithMembersAsUsers } from '@/types/group';
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
