import HostBadge from '@/components/HostBadge';
import ListItem from '@/components/ListItem';
import MeBadge from '@/components/MeBadge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import UserImage from '@/components/UserImage';
import { useAlert } from '@/context/Alert';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useIsGroupHost } from '@/hooks/useIsGroupHost';
import {
  changeGroupHostMutationOptions,
  expelGroupMemberMutationOptions,
} from '@/queries/group/mutation';
import { GroupWithMembersAsUsers } from '@/types/group';
import { useMutation } from '@tanstack/react-query';
import { LucideCrown, LucideUserMinus2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function MemberListItem({ member, group }: Props) {
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const session = useSession();
  const loggedInUserId = session?.data?.user?.id;
  const { user, userId } = member;
  const { hostId: groupHostId } = group;
  const { isGroupHost } = useIsGroupHost(groupHostId, userId);
  const isMe = loggedInUserId === userId;
  const isMeGroupHost = loggedInUserId === groupHostId;
  const expelGroupMemberMutation = useMutation(expelGroupMemberMutationOptions);
  const changeGroupHostMutation = useMutation(changeGroupHostMutationOptions);
  const { handleAxiosError } = useAxiosError();

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
          await expelGroupMemberMutation.mutateAsync({
            groupId: group.id,
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
      title: '리더 번경하기',
      description: (
        <>
          <b>{user.name}</b>님을 리더로 변경하시겠습니까?
          <br />
          <b className="text-destructive">나는 일반 멤버로 변경</b>됩니다.
        </>
      ),
      actionLabel: '리더 변경',
      action: async () => {
        try {
          await changeGroupHostMutation.mutateAsync({
            groupId: group.id,
            hostId: userId,
          });
          toast({
            description: `${user.name}님이 리더가 되었습니다.`,
            variant: 'success',
          });
        } catch (e) {
          handleAxiosError(e);
        }
      },
    });
  };

  return (
    <ListItem className="hover:cursor-default">
      <div className="flex items-center gap-2">
        <UserImage src={user.image} size={40} />
        <span>{user.name}</span>
        {isMe && <MeBadge />}
      </div>

      {isGroupHost && <HostBadge />}

      {isMeGroupHost && !isMe && (
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleClickExpelMember}>
                <LucideUserMinus2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>내보내기</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleClickChangeHost}>
                <LucideCrown />
              </Button>
            </TooltipTrigger>
            <TooltipContent>리더 변경하기</TooltipContent>
          </Tooltip>
        </div>
      )}
    </ListItem>
  );
}

type Props = {
  member: GroupWithMembersAsUsers['members'][number];
  group: GroupWithMembersAsUsers;
};
