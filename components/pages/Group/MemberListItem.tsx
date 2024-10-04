import HostBadge from '@/components/HostBadge';
import ListItem from '@/components/ListItem';
import MeBadge from '@/components/MeBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { useAlert } from '@/context/Alert';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useIsGroupHost } from '@/hooks/useIsGroupHost';
import { expelGroupMemberMutationOptions } from '@/queries/group/mutation';
import { GroupWithMembersAsUsers } from '@/types/group';
import { useMutation } from '@tanstack/react-query';
import { LucideUser2, LucideUserMinus2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function MemberListItem({ member, groupHostId }: Props) {
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const session = useSession();
  const loggedInUserId = session?.data?.user?.id;
  const { user, userId } = member;
  const { isGroupHost } = useIsGroupHost(groupHostId, userId);
  const isMe = loggedInUserId === userId;
  const isMeGroupHost = loggedInUserId === groupHostId;
  const expelGroupMemberMutation = useMutation(expelGroupMemberMutationOptions);
  const { handleAxiosError } = useAxiosError();

  const handleClickExpelMember = () => {
    openAlert({
      title: '멤버 내보내기',
      description: (
        <>
          멤버 (<b>{user.name}</b>) 를 내보내시겠습니까?
        </>
      ),
      actionLabel: '내보내기',
      action: async () => {
        try {
          await expelGroupMemberMutation.mutateAsync({
            groupId: member.groupId,
            memberId: member.userId,
          });
          toast({
            description: `${user.name} 멤버를 내보냈습니다`,
            variant: 'success',
          });
        } catch (e) {
          handleAxiosError(e);
        }
      },
    });
  };

  return (
    <ListItem>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback>
            <LucideUser2 />
          </AvatarFallback>
        </Avatar>
        <span>{user.name}</span>
        {isMe && <MeBadge />}
      </div>

      {isGroupHost && <HostBadge />}

      {isMeGroupHost && !isMe && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleClickExpelMember}>
              <LucideUserMinus2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent>내보내기</TooltipContent>
        </Tooltip>
      )}
    </ListItem>
  );
}

type Props = {
  member: GroupWithMembersAsUsers['members'][number];
  groupHostId: string;
};
