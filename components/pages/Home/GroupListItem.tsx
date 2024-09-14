'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { useAlert } from '@/context/Alert';
import { useFormDialog } from '@/context/FormDialog';
import { useAxiosError } from '@/hooks/useAxiosError';
import { deleteGroupMutationOptions } from '@/queries/group/mutation';
import { GroupWithMembers } from '@/types/group';
import { useMutation } from '@tanstack/react-query';
import { LucideCrown, LucideEdit2, LucideTrash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';

export default function GroupListItem({ group, isHost }: Props) {
  const router = useRouter();
  const { openForm } = useFormDialog();
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const deleteGroupMutation = useMutation(deleteGroupMutationOptions);

  const moveToGroup = () => router.push(`${PATHS.GROUP}/${group.id}`);

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
          return true;
        } catch (error) {
          handleAxiosError(error);
          return false;
        }
      },
    });
  };

  return (
    <li
      className="flex items-center justify-between p-4 border border-primary/30 rounded-sm hover:bg-primary-foreground hover:cursor-pointer transition-colors"
      onClick={moveToGroup}
    >
      <div className="flex gap-2 items-center">
        <span className="text-xl font-semibold">{group.name}</span>
        {isHost && (
          <Avatar>
            <AvatarFallback>
              <LucideCrown size={18} />
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      {isHost && (
        <div className="flex gap-2 items-center">
          <Button type="button" size="icon" variant="ghost" onClick={handleClickEditGroup}>
            <LucideEdit2 size={20} />
          </Button>
          <Button type="button" size="icon" variant="ghost" onClick={handleClickDeleteGroup}>
            <LucideTrash2 className="text-destructive" size={20} />
          </Button>
        </div>
      )}
    </li>
  );
}

type Props = {
  group: GroupWithMembers;
  isHost?: boolean;
};
