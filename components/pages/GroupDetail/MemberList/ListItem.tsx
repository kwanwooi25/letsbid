import HostBadge from '@/components/common/HostBadge';
import ListItem from '@/components/common/ListItem';
import MeBadge from '@/components/common/MeBadge';
import UserImage from '@/components/common/UserImage';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  ScrollableDialogContent,
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { useAlert } from '@/context/Alert';
import {
  changeGroupHostMutationOptions,
  expelGroupMemberMutationOptions,
  updateGroupViceHostsMutationOptions,
} from '@/features/group/mutation';
import { GroupMember, GroupWithMembers } from '@/features/group/types';
import { useIsGroupMember } from '@/features/group/useIsGroupMember';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { formatPhoneNumber } from '@/lib/string';
import { useMutation } from '@tanstack/react-query';
import uniq from 'lodash/uniq';
import { LucideUserMinus2 } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function MemberListItem({ member, group }: Props) {
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const { loggedInUser } = useLoggedInUser();
  const loggedInUserId = loggedInUser?.id;
  const { user, userId, groupId } = member;
  const { isGroupHost, isViceGroupHost } = useIsGroupMember(group, userId);
  const { isGroupHost: isMeGroupHost, isViceGroupHost: isMeViceGroupHost } =
    useIsGroupMember(group);
  const isMe = loggedInUserId === userId;
  const { mutateAsync: expelGroupMember } = useMutation(expelGroupMemberMutationOptions);
  const { mutateAsync: changeGroupHost } = useMutation(changeGroupHostMutationOptions);
  const { mutateAsync: updateGroupViceHosts } = useMutation(updateGroupViceHostsMutationOptions);
  const { handleAxiosError } = useAxiosError();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedUserId = searchParams.get('selectedUserId');

  const setSelectedUser = (userIdToSelect?: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (!userIdToSelect) {
      newSearchParams.delete('selectedUserId');
    } else {
      newSearchParams.set('selectedUserId', userIdToSelect);
    }

    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleClickExpelMember = () => {
    openAlert({
      title: '멤버 내보내기',
      description: (
        <>
          <b>{user.name}</b>님을 내보내시겠습니까?
        </>
      ),
      actionLabel: '내보내기',
      action: async () => {
        try {
          await expelGroupMember({
            groupId,
            memberId: userId,
          });
          toast({
            description: `${user.name}님을 내보냈습니다`,
            variant: 'success',
          });
        } catch (e) {
          handleAxiosError(e);
        }
      },
    });
  };

  const handleClickChangeHost = () => {
    openAlert({
      title: '방장 번경하기',
      description: (
        <>
          <b>{user.name}</b>님을 방장으로 변경하시겠습니까?
          <br />
          <b className="text-destructive">나는 일반 멤버로 변경</b>됩니다.
        </>
      ),
      actionLabel: '방장 변경',
      action: async () => {
        try {
          await changeGroupHost({
            groupId,
            hostId: userId,
          });
          toast({
            description: `${user.name}님이 방장이 되었습니다.`,
            variant: 'success',
          });
        } catch (e) {
          handleAxiosError(e);
        }
      },
    });
  };

  const handleClickViceHost = () => {
    const title = isViceGroupHost ? '부방장 해제하기' : '부방장 지정하기';
    const description = isViceGroupHost ? (
      <>
        <b>{user.name}</b>님을 부방장에서 해제하시겠습니까?
      </>
    ) : (
      <>
        <b>{user.name}</b>님을 부방장으로 지정하시겠습니까?
      </>
    );
    const actionLabel = isViceGroupHost ? '부방장 해제' : '부방장 지정';
    const viceHostIds = group.viceHostIds ?? [];
    const newViceGroupHostIds = isViceGroupHost
      ? viceHostIds.filter((id) => id !== userId)
      : uniq([...viceHostIds, userId]);
    const successMessage = isViceGroupHost
      ? `${user.name}님이 부방장에서 해제되었습니다.`
      : `${user.name}님이 부방장으로 지정되었습니다.`;

    openAlert({
      title,
      description,
      actionLabel,
      action: async () => {
        try {
          await updateGroupViceHosts({
            groupId,
            viceHostIds: newViceGroupHostIds,
          });
          toast({
            description: successMessage,
            variant: 'success',
          });
        } catch (e) {
          handleAxiosError(e);
        }
      },
    });
  };

  return (
    <>
      <ListItem className="hover:cursor-default">
        <div className="flex items-center gap-2">
          <UserImage
            src={user.image}
            role={user.role}
            size={40}
            isHost={isGroupHost}
            isViceHost={isViceGroupHost}
          />
          <div className="flex items-center gap-2">
            {isMeGroupHost || isMeViceGroupHost ? (
              <a
                className="font-bold hover:underline hover:cursor-pointer"
                onClick={() => setSelectedUser(userId)}
              >
                {user.name}
              </a>
            ) : (
              <span className="font-bold">{user.name}</span>
            )}
            {isMe && <MeBadge />}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {(isMeGroupHost || isMeViceGroupHost) && !isMe && !isGroupHost && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="rounded-full"
                  variant="ghost"
                  size="icon"
                  onClick={handleClickExpelMember}
                >
                  <LucideUserMinus2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>내보내기</TooltipContent>
            </Tooltip>
          )}

          {isMeGroupHost && !isMe && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="rounded-full"
                    variant="ghost"
                    size="icon"
                    onClick={handleClickChangeHost}
                  >
                    <HostBadge className="w-8 h-8 opacity-70 hover:opacity-100 transition-opacity" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>방장 변경하기</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="rounded-full"
                    variant="ghost"
                    size="icon"
                    onClick={handleClickViceHost}
                  >
                    <HostBadge
                      className="w-8 h-8 opacity-70 hover:opacity-100 transition-opacity"
                      isViceHost
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isViceGroupHost ? '부방장 해제하기' : '부방장 지정하기'}
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </div>
      </ListItem>

      <Dialog
        open={selectedUserId === userId}
        onOpenChange={(open) => setSelectedUser(open ? userId : null)}
      >
        <ScrollableDialogContent aria-describedby="">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <UserImage
              src={user.image}
              alt={user.name}
              size={128}
              badgeSize={48}
              isHost={isGroupHost}
              isViceHost={isViceGroupHost}
              role={user.role}
            />
            <div className="w-full flex flex-col gap-2">
              <span className="text-xl font-bold">{user.name}</span>
              <span className="font-semibold text-primary/50">{user.email}</span>
              {!!user.mobile && (
                <a
                  className="font-semibold text-primary/50 hover:underline"
                  href={`tel:${user.mobile}`}
                >
                  {formatPhoneNumber(user.mobile)}
                </a>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => setSelectedUser(null)}>
              확인
            </Button>
          </DialogFooter>
        </ScrollableDialogContent>
      </Dialog>
    </>
  );
}

type Props = {
  member: GroupMember;
  group: GroupWithMembers;
};
