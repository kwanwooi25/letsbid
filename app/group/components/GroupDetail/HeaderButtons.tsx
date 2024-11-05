'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { useAlert } from '@/context/Alert';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { useIsGroupHost } from '@/hooks/useIsGroupHost';
import {
  archiveGroupMutationOptions,
  deleteGroupMutationOptions,
  expelGroupMemberMutationOptions,
  unarchiveGroupMutationOptions,
} from '@/queries/group/mutation';
import { GroupWithMembers } from '@/types/group';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';

export default function GroupDetailHeaderButtons({ group }: Props) {
  const session = useSession();
  const loggedInUserId = session?.data?.user?.id;
  const { isGroupHost } = useIsGroupHost(group.hostId);
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const router = useRouter();
  const currentUrl = useCurrentUrl();
  const { handleAxiosError } = useAxiosError();
  const { mutateAsync: archiveGroup } = useMutation(archiveGroupMutationOptions);
  const { mutateAsync: unarchiveGroup } = useMutation(unarchiveGroupMutationOptions);
  const { mutateAsync: deleteGroup } = useMutation(deleteGroupMutationOptions);
  const { mutateAsync: expelGroupMember } = useMutation(expelGroupMemberMutationOptions);

  const isArchived = !!group.archivedAt;

  const handleClickEditGroup: ButtonHTMLAttributes<HTMLButtonElement>['onClick'] = (e) => {
    e.stopPropagation();
    router.push(`${PATHS.GROUP}/${group.id}/edit?callbackUrl=${currentUrl}`);
  };

  const handleClickDeleteGroup: ButtonHTMLAttributes<HTMLButtonElement>['onClick'] = (e) => {
    e.stopPropagation();
    openAlert({
      title: '그룹 삭제',
      description: (
        <>
          그룹을 삭제하면 해당 그룹에서 진행했던
          <br />
          <b className="text-destructive">모든 입찰 내역이 삭제</b>됩니다.
          <br />
          <b>{group.name}</b> 그룹을 삭제하시겠습니까?
        </>
      ),
      actionLabel: '삭제',
      action: async () => {
        try {
          await deleteGroup(group.id);
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

  const handleClickArchiveGroup: ButtonHTMLAttributes<HTMLButtonElement>['onClick'] = (e) => {
    e.stopPropagation();
    openAlert({
      title: '그룹 숨김',
      description: (
        <>
          그룹을 숨김 처리하면 <b className="text-destructive">더이상 멤버가 참여할 수 없고</b>
          <br />
          <b className="text-destructive">경매 사건을 추가할 수 없게</b> 됩니다.
          <br />
          <b>{group.name}</b> 그룹을 숨김 처리하시겠습니까?
        </>
      ),
      actionLabel: '숨김',
      action: async () => {
        try {
          await archiveGroup(group.id);
          toast({
            description: '그룹이 숨김 처리되었습니다',
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

  const handleClickUnarchiveGroup: ButtonHTMLAttributes<HTMLButtonElement>['onClick'] = (e) => {
    e.stopPropagation();
    openAlert({
      title: '그룹 숨김 해제',
      description: (
        <>
          <b>{group.name}</b> 그룹을 숨김 해제하시겠습니까?
        </>
      ),
      actionLabel: '숨김 해제',
      action: async () => {
        try {
          await unarchiveGroup(group.id);
          toast({
            description: '그룹이 숨김 해제되었습니다',
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

  const handleClickOut = () => {
    openAlert({
      title: '그룹에서 나가기',
      description: (
        <>
          <b>{group.name}</b> 그룹에서 나가시겠습니까?
        </>
      ),
      actionLabel: '나가기',
      action: async () => {
        try {
          await expelGroupMember({
            groupId: group.id,
            memberId: loggedInUserId!,
          });
          toast({
            description: `${group.name} 그룹에서 나왔습니다.`,
            variant: 'success',
          });
          router.replace(PATHS.HOME);
        } catch (e) {
          handleAxiosError(e);
        }
      },
    });
  };

  return (
    <div className="flex items-center gap-2">
      {isGroupHost ? (
        <>
          <Button type="button" onClick={handleClickEditGroup}>
            수정
          </Button>
          {isArchived ? (
            <Button type="button" variant="destructive-outline" onClick={handleClickUnarchiveGroup}>
              숨김 해제
            </Button>
          ) : (
            <Button type="button" variant="destructive-outline" onClick={handleClickArchiveGroup}>
              숨김
            </Button>
          )}
          <Button type="button" variant="destructive" onClick={handleClickDeleteGroup}>
            삭제
          </Button>
        </>
      ) : (
        <Button type="button" variant="destructive" onClick={handleClickOut}>
          그룹에서 나가기
        </Button>
      )}
    </div>
  );
}

type Props = {
  group: GroupWithMembers;
};
