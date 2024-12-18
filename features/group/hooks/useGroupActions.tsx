import { useToast } from '@/components/ui/use-toast';
import { useAlert } from '@/context/Alert';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { useMutation } from '@tanstack/react-query';
import {
  archiveGroupMutationOptions,
  deleteGroupMutationOptions,
  expelGroupMemberMutationOptions,
  unarchiveGroupMutationOptions,
} from '../mutation';
import { GroupWithMembers } from '../types';
import { useGroupRouter } from './useGroupRouter';

export function useGroupActions() {
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const { loggedInUser } = useLoggedInUser();
  const { moveToGroupList } = useGroupRouter();

  const { mutateAsync: deleteGroup } = useMutation(deleteGroupMutationOptions);
  const { mutateAsync: archiveGroup } = useMutation(archiveGroupMutationOptions);
  const { mutateAsync: unarchiveGroup } = useMutation(unarchiveGroupMutationOptions);
  const { mutateAsync: expelGroupMember } = useMutation(expelGroupMemberMutationOptions);

  const tryToDeleteGroup = (group: GroupWithMembers) => {
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

  const tryToArchiveGroup = (group: GroupWithMembers) => {
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

  const tryToUnarchiveGroup = (group: GroupWithMembers) => {
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

  const tryToMoveOutFromGroup = (group: GroupWithMembers) => {
    if (!loggedInUser) return;

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
            memberId: loggedInUser.id,
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

  const copyGroupDetailLink = (group: GroupWithMembers) => {
    if (!navigator?.clipboard?.writeText) return;

    const url = `${window.location.origin}/group/${group.id}`;
    navigator.clipboard.writeText(url);
    toast({
      description: '그룹 링크가 복사되었습니다.',
      variant: 'success',
    });
  };

  return {
    tryToDeleteGroup,
    tryToArchiveGroup,
    tryToUnarchiveGroup,
    tryToMoveOutFromGroup,
    copyGroupDetailLink,
  };
}
