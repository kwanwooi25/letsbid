'use client';

import HostBadge from '@/components/common/HostBadge';
import ListItem from '@/components/common/ListItem';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { useFormDialog } from '@/context/FormDialog';
import {
  getMinimumUserRole,
  GroupWithMembers,
  joinGroupMutationOptions,
  useIsGroupMember,
} from '@/features/group';
import GroupMenu from '@/features/group/components/GroupMenu';
import { useAxiosError, useLoggedInUser } from '@/hooks';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { LucideLock, LucideLockOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GroupListItem({ group }: Props) {
  const { loggedInUser } = useLoggedInUser();
  const router = useRouter();
  const { toast } = useToast();
  const { mutateAsync: joinGroup } = useMutation(joinGroupMutationOptions);
  const { handleAxiosError } = useAxiosError();
  const { openForm } = useFormDialog();
  const { isViceGroupHost, isGroupAdmin, isGroupMember } = useIsGroupMember(group);

  const { id, name, members, maxMembers, isPrivate, description, archivedAt, userRoles } = group;
  const isMaxMemberReached = members.length >= maxMembers;
  const isArchived = !!archivedAt;
  const isJoinable =
    !isArchived && !isMaxMemberReached && !!loggedInUser && userRoles.includes(loggedInUser.role);
  const minimumRole = getMinimumUserRole(userRoles);

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
    <ListItem
      onClick={isGroupMember ? moveToGroup : isJoinable ? handleClickJoin : undefined}
      className={cn(
        'min-h-[86px] hover:opacity-90 border-0',
        minimumRole === 'USER' && 'gradient-bronze',
        minimumRole === 'PAID_USER' && 'gradient-silver',
        minimumRole === 'VIP_USER' && 'gradient-gold',
        minimumRole === 'ADMIN' && 'gradient-emerald',
        !isGroupMember && !isJoinable && '!cursor-not-allowed hover:opacity-100',
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold line-clamp-1">{name}</span>
          {isGroupAdmin && <HostBadge className="shrink-0" isViceHost={isViceGroupHost} />}
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
      <GroupMenu triggerClassName="shrink-0" group={group} />
    </ListItem>
  );
}

type Props = {
  group: GroupWithMembers;
};
