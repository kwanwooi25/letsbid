'use client';

import HostBadge from '@/components/HostBadge';
import ListItem from '@/components/ListItem';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { useFormDialog } from '@/context/FormDialog';
import { useAxiosError } from '@/hooks/useAxiosError';
import { cn } from '@/lib/utils';
import { joinGroupMutationOptions } from '@/queries/group/mutation';
import { GroupWithMembers } from '@/types/group';
import { useMutation } from '@tanstack/react-query';
import { LucideLock, LucideLockOpen } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function GroupListItem({ group, isHost }: Props) {
  const session = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const { mutateAsync: joinGroup, isPending } = useMutation(joinGroupMutationOptions);
  const { handleAxiosError } = useAxiosError();
  const { openForm } = useFormDialog();

  const { id, name, members, maxMembers, isPrivate, description, archivedAt } = group;
  const isJoinable =
    members.filter((member) => member.userId === session?.data?.user.id).length === 0;
  const isMaxMemberReached = members.length >= maxMembers;
  const isArchived = !!archivedAt;

  const moveToGroup = () => router.push(`${PATHS.GROUP}/${id}`);

  const onSuccess = () => {
    toast({
      description: (
        <>
          <b>{name}</b> 그룹에 참여했습니다
        </>
      ),
      variant: 'success',
    });
    moveToGroup();
  };

  const handleClickJoin = async () => {
    if (isPrivate) {
      openForm({
        type: 'JOIN_PRIVATE_GROUP',
        formProps: {
          group,
          onSubmit: onSuccess,
        },
      });
      return;
    }

    try {
      await joinGroup({ groupId: id });
      onSuccess();
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <ListItem className={cn('min-h-[86px] hover:cursor-default')}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold line-clamp-1">{name}</span>
          {isHost && <HostBadge className="shrink-0" />}
        </div>
        {!!description && (
          <div className="text-xs font-semibold text-primary/50 line-clamp-1">{description}</div>
        )}
        <div className="flex items-center gap-2 min-h-[20px]">
          <span
            className={cn(
              'text-sm font-semibold text-primary/50',
              isMaxMemberReached && 'text-destructive/80',
            )}
          >
            {members.length.toLocaleString()}/{maxMembers.toLocaleString()}명
          </span>
          {!isArchived && (
            <div
              className={cn(
                'w-[20px] h-[20px] rounded-full flex items-center justify-center shrink-0',
                isPrivate && 'bg-destructive/20',
                !isPrivate && 'bg-green-100',
              )}
            >
              {isPrivate && <LucideLock className="w-3 h-3 text-destructive" />}
              {!isPrivate && <LucideLockOpen className="w-3 h-3 text-green-700" />}
            </div>
          )}
        </div>
      </div>

      <Button
        onClick={isJoinable ? handleClickJoin : moveToGroup}
        type="button"
        isLoading={isPending}
        disabled={isMaxMemberReached}
      >
        {isJoinable ? '참여하기' : '들어가기'}
      </Button>
    </ListItem>
  );
}

type Props = {
  group: GroupWithMembers;
  isHost?: boolean;
};
