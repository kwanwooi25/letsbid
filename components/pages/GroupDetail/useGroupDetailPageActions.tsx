import { useToast } from '@/components/ui/use-toast';
import { useAlert } from '@/context/Alert';
import { useAxiosError } from '@/hooks/useAxiosError';
import {
  archiveGroupMutationOptions,
  deleteGroupMutationOptions,
  expelGroupMemberMutationOptions,
  unarchiveGroupMutationOptions,
} from '@/queries/group/mutation';
import { GroupWithMembers } from '@/types/group';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useGroupDetailRouter } from './useGroupDetailRouter';

export function useGroupDetailPageActions({ group }: Args) {
  const session = useSession();
  const loggedInUserId = session?.data?.user?.id;
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();

  const { mutateAsync: deleteGroup } = useMutation(deleteGroupMutationOptions);
  const { mutateAsync: archiveGroup } = useMutation(archiveGroupMutationOptions);
  const { mutateAsync: unarchiveGroup } = useMutation(unarchiveGroupMutationOptions);
  const { mutateAsync: expelGroupMember } = useMutation(expelGroupMemberMutationOptions);

  const { moveToGroupList } = useGroupDetailRouter();

  const tryToDeleteGroup = () => {
    if (!group) return;

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
          moveToGroupList();
          return true;
        } catch (error) {
          handleAxiosError(error);
          return false;
        }
      },
    });
  };

  const tryToArchiveGroup = () => {
    if (!group) return;

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

  const tryToUnarchiveGroup = () => {
    if (!group) return;

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

  const tryToMoveOutFromGroup = () => {
    if (!group) return;

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
          moveToGroupList();
          return true;
        } catch (e) {
          handleAxiosError(e);
          return false;
        }
      },
    });
  };

  return {
    tryToDeleteGroup,
    tryToArchiveGroup,
    tryToUnarchiveGroup,
    tryToMoveOutFromGroup,
  };
}

type Args = {
  group?: GroupWithMembers;
};
