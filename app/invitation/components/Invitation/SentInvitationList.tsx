import ListEmpty from '@/components/ListEmpty';
import { getInvitationListQueryOptions } from '@/queries/invitation/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import SentInvitationListItem from './SentInvitationListItem';

export default function SentInvitationList() {
  const { data: invitations, isPending } = useSuspenseQuery(getInvitationListQueryOptions('sent'));

  if (!isPending && !invitations.length) {
    return <ListEmpty message="보낸 초대가 없습니다." />;
  }

  return (
    <ul className="flex flex-col gap-4 py-4">
      {invitations.map((invitation) => (
        <SentInvitationListItem key={invitation.id} invitation={invitation} />
      ))}
    </ul>
  );
}
