import ListEmpty from '@/components/ListEmpty';
import { getInvitationListQueryOptions } from '@/queries/invitation/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import ReceivedInvitationListItem from './ReceivedInvitationListItem';

export default function ReceivedInvitationList() {
  const { data: invitations, isPending } = useSuspenseQuery(
    getInvitationListQueryOptions('received'),
  );

  if (!isPending && !invitations.length) {
    return <ListEmpty message="받은 초대가 없습니다." />;
  }

  return (
    <ul className="flex flex-col gap-4 py-4">
      {invitations.map((invitation) => (
        <ReceivedInvitationListItem key={invitation.id} invitation={invitation} />
      ))}
    </ul>
  );
}
