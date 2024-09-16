import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAlert } from '@/context/Alert';
import { useAxiosError } from '@/hooks/useAxiosError';
import { cancelInvitationMutationOptions } from '@/queries/invitation/mutation';
import { InvitationWithGroupAndInviter } from '@/types/invitation';
import { useMutation } from '@tanstack/react-query';
import { LucideUser } from 'lucide-react';

export default function SentInvitationListItem({ invitation }: Props) {
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const cancelInvitationMutation = useMutation(cancelInvitationMutationOptions);

  const handleClickCancel = () => {
    openAlert({
      title: '초대 취소',
      description: (
        <>
          <b>{invitation.inviteeEmail}</b>님에게 보낸 <b>{invitation.group.name}</b> 그룹 초대를{' '}
          <b className="text-destructive">취소</b>할까요?
        </>
      ),
      actionLabel: '초대 취소',
      action: async () => {
        try {
          await cancelInvitationMutation.mutateAsync(invitation.id);
          toast({
            title: '초대를 취소했습니다.',
            description: invitation.inviteeEmail,
            variant: 'success',
          });
        } catch (e) {
          handleAxiosError(e);
        }
      },
    });
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
