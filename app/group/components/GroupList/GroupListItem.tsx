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

  const { id, name, members, maxMembers, isPrivate } = group;
  const isJoinable =
    members.filter((member) => member.userId === session?.data?.user.id).length === 0;
  const isMaxMemberReached = members.length >= maxMembers;

  const moveToGroup = () => router.push(`${PATHS.GROUP}/${id}`, { scroll: false });

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
    <ListItem
      className={cn('min-h-[86px]', isJoinable && 'hover:cursor-default')}
      onClick={isJoinable ? undefined : moveToGroup}
    >
      <div className="flex flex-col gap-2">
        <span className="text-xl font-semibold line-clamp-1">{name}</span>
        <div className="flex items-center gap-2 min-h-[20px]">
          <span
            className={cn(
              'text-sm font-semibold text-primary/50',
              isMaxMemberReached && 'text-destructive/80',
            )}
          >
            {members.length.toLocaleString()}/{maxMembers.toLocaleString()}명
          </span>
          <div
            className={cn(
              'w-[20px] h-[20px] rounded-full flex items-center justify-center shrink-0',
              isPrivate ? 'bg-destructive/20' : 'bg-green-100',
            )}
          >
            {isPrivate ? (
              <LucideLock className="w-3 h-3 text-destructive" />
            ) : (
              <LucideLockOpen className="w-3 h-3 text-green-700" />
            )}
          </div>
        </div>
      </div>

      {isHost && <HostBadge className="shrink-0" />}

      {isJoinable && (
        <Button
          onClick={handleClickJoin}
          type="button"
          isLoading={isPending}
          disabled={isMaxMemberReached}
        >
          참여하기
        </Button>
      )}
    </ListItem>
  );
}

type Props = {
  group: GroupWithMembers;
  isHost?: boolean;
};
