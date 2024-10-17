import ListItem from '@/components/ListItem';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAlert } from '@/context/Alert';
import { useAxiosError } from '@/hooks/useAxiosError';
import { respondToInvitationMutationOptions } from '@/queries/invitation/mutation';
import { InvitationWithGroupAndInviter } from '@/types/invitation';
import { useMutation } from '@tanstack/react-query';
import { LucideCrown } from 'lucide-react';

export default function ReceivedInvitationListItem({ invitation }: Props) {
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const respondToInvitationMutation = useMutation(respondToInvitationMutationOptions);

  const handleClickAccept = () => {
    openAlert({
      title: '초대 수락',
      description: (
        <>
          <b>{invitation.inviter.name}</b>님이 보낸 <b>{invitation.group.name}</b> 그룹 초대를{' '}
          <b className="text-green-700">수락</b>할까요?
        </>
      ),
      actionLabel: '수락',
      action: async () => {
        try {
          await respondToInvitationMutation.mutateAsync({
            invitationId: invitation.id,
            response: 'accept',
          });
          toast({
            title: '초대를 수락했습니다.',
            description: invitation.group.name,
            variant: 'success',
          });
        } catch (e) {
          handleAxiosError(e);
        }
      },
    });
  };

  const handleClickReject = () => {
    openAlert({
      title: '초대 거절',
      description: (
        <>
          <b>{invitation.inviter.name}</b>님이 보낸 <b>{invitation.group.name}</b> 그룹 초대를{' '}
          <b className="text-destructive">거절</b>할까요?
        </>
      ),
      actionLabel: '거절',
      action: async () => {
        try {
          await respondToInvitationMutation.mutateAsync({
            invitationId: invitation.id,
            response: 'reject',
          });
          toast({
            title: '초대를 거절했습니다.',
            description: invitation.group.name,
            variant: 'success',
          });
        } catch (e) {
          handleAxiosError(e);
        }
      },
    });
  };

  return (
    <ListItem>
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
    </ListItem>
  );
}

type Props = {
  invitation: InvitationWithGroupAndInviter;
};
