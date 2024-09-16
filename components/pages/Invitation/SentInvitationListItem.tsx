import { Button } from '@/components/ui/button';
import { InvitationWithGroupAndInviter } from '@/types/invitation';
import { LucideUser } from 'lucide-react';

export default function SentInvitationListItem({ invitation }: Props) {
  const handleClickCancel = () => {
    //TODO
    console.log('cancel');
  };

  return (
    <li className="flex items-center justify-between p-4 border border-primary/30 rounded-sm hover:bg-primary-foreground hover:cursor-pointer transition-colors">
      <div className="flex flex-col">
        <span className="text-lg font-bold">{invitation.group.name}</span>
        <div className="flex items-center text-primary/70">
          <LucideUser className="w-4 h-4 mr-2" />
          <span className="text-md">{invitation.inviteeEmail}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button type="button" variant="destructive" onClick={handleClickCancel}>
          취소
        </Button>
      </div>
    </li>
  );
}

type Props = {
  invitation: InvitationWithGroupAndInviter;
};
