import { Button } from '@/components/ui/button';
import { InvitationWithGroupAndInviter } from '@/types/invitation';
import { LucideCrown } from 'lucide-react';

export default function ReceivedInvitationListItem({ invitation }: Props) {
  const handleClickAccept = () => {
    //TODO
    console.log('accept');
  };

  const handleClickReject = () => {
    //TODO
    console.log('reject');
  };

  return (
    <li className="flex items-center justify-between p-4 border border-primary/30 rounded-sm hover:bg-primary-foreground hover:cursor-pointer transition-colors">
      <div className="flex flex-col">
        <span className="text-lg font-bold">{invitation.group.name}</span>
        <div className="flex items-center text-primary/70">
          <LucideCrown className="w-4 h-4 mr-2" />
          <span className="text-md">{invitation.inviter.name}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button type="button" onClick={handleClickAccept}>
          수락
        </Button>
        <Button type="button" variant="destructive" onClick={handleClickReject}>
          거절
        </Button>
      </div>
    </li>
  );
}

type Props = {
  invitation: InvitationWithGroupAndInviter;
};
