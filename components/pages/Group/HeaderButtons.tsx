'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { useAlert } from '@/context/Alert';
import { useFormDialog } from '@/context/FormDialog';
import { useAxiosError } from '@/hooks/useAxiosError';
import { deleteGroupMutationOptions } from '@/queries/group/mutation';
import { GroupWithMembers } from '@/types/group';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';

export default function GroupDetailHeaderButtons({ isHost, group }: Props) {
  const { openForm } = useFormDialog();
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const router = useRouter();
  const { handleAxiosError } = useAxiosError();
  const deleteGroupMutation = useMutation(deleteGroupMutationOptions);

  const handleClickEditGroup: ButtonHTMLAttributes<HTMLButtonElement>['onClick'] = (e) => {
    e.stopPropagation();
    openForm({
      type: 'GROUP',
      formProps: {
        group,
      },
    });
  };

  const handleClickDeleteGroup: ButtonHTMLAttributes<HTMLButtonElement>['onClick'] = (e) => {
    e.stopPropagation();
    openAlert({
      title: '옵션 삭제',
      description: (
        <>
          그룹을 삭제하면 해당 그룹에서 진행했던{' '}
          <b className="text-destructive">모든 입찰 내역이 삭제</b>됩니다.
          <br />
          그룹 (<b>{group.name}</b>) 을 삭제하시겠습니까?
        </>
      ),
      actionLabel: '삭제',
      action: async () => {
        try {
          await deleteGroupMutation.mutateAsync(group.id);
          toast({
            description: '그룹이 삭제 되었습니다',
            variant: 'success',
          });
          router.replace(PATHS.HOME);
          return true;
        } catch (error) {
          handleAxiosError(error);
          return false;
        }
      },
    });
  };

  return (
    <div className="flex items-center gap-2">
      {isHost && (
        <>
          <Button type="button" onClick={handleClickEditGroup}>
            수정
          </Button>
          <Button type="button" variant="destructive" onClick={handleClickDeleteGroup}>
            삭제
          </Button>
        </>
      )}
    </div>
  );
}

type Props = {
  isHost?: boolean;
  group: GroupWithMembers;
};
