'use client';

import PageBody from '@/components/layouts/PageBody';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { useAlert } from '@/context/Alert';
import { useFormDialog } from '@/context/FormDialog';
import { MINIMUM_USER_ROLE_TRANSLATION } from '@/features/group/const';
import { joinGroupMutationOptions } from '@/features/group/mutation';
import { getGroupDetailQueryOptions } from '@/features/group/query';
import { getMinimumUserRole } from '@/features/group/utils';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useCallbackUrl } from '@/hooks/useCallbackUrl';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { cn } from '@/lib/utils';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { LucideLock, LucideLockOpen } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function NeedToJoinGroup() {
  const { loggedInUser } = useLoggedInUser();
  const router = useRouter();
  const { toast } = useToast();
  const { openAlert } = useAlert();
  const { openForm } = useFormDialog();
  const params = useParams();
  const groupId = params.groupId as string;
  const { data: group } = useSuspenseQuery(getGroupDetailQueryOptions(groupId));
  const { mutateAsync: joinGroup } = useMutation(joinGroupMutationOptions);
  const { handleAxiosError } = useAxiosError();
  const callbackUrl = useCallbackUrl();

  const { name, description, isPrivate, userRoles } = group;
  const isJoinable = loggedInUser && userRoles.includes(loggedInUser.role);
  const minimumRole = getMinimumUserRole(userRoles);
  const minimumRoleTranslation = MINIMUM_USER_ROLE_TRANSLATION[minimumRole];

  const onSuccess = () => {
    toast({
      description: (
        <>
          <b>{name}</b> 그룹에 참여했습니다
        </>
      ),
      variant: 'success',
    });

    if (callbackUrl) {
      router.replace(callbackUrl);
      return;
    }

    router.refresh();
  };

  const handleClickJoin = async () => {
    if (!isJoinable) {
      openAlert({
        title: '그룹 참여 불가',
        description: (
          <>
            <b>{minimumRoleTranslation} 이상</b>만 참여 가능한 그룹입니다.
            <br />
            회원 등급을 확인해주세요.
          </>
        ),
        actionLabel: '확인',
        action: () => {
          if (callbackUrl) {
            router.replace(callbackUrl);
            return;
          }

          router.replace(PATHS.GROUP);
        },
      });
      return;
    }

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
      await joinGroup({ groupId });
      onSuccess();
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <PageBody className="max-w-xl flex flex-col items-center gap-8 py-20">
      <div
        className={cn(
          'flex flex-col items-center gap-2 p-4 rounded-xl',
          minimumRole === 'USER' && 'gradient-bronze',
          minimumRole === 'PAID_USER' && 'gradient-silver',
          minimumRole === 'VIP_USER' && 'gradient-gold',
          minimumRole === 'ADMIN' && 'gradient-emerald',
        )}
      >
        <h5 className="text-2xl font-bold flex items-center gap-2">
          {name}
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
        </h5>
        {!!description && <p className="font-semibold text-foreground/70">{description}</p>}
      </div>
      <Divider className="w-full" />
      <p className="text-xl font-semibold text-foreground/70">그룹에 참여하시겠습니까?</p>
      <div className="flex items-center gap-2">
        <Link href={PATHS.GROUP} passHref replace>
          <Button variant="outline">그룹 목록으로</Button>
        </Link>
        <Button onClick={handleClickJoin}>참여하기</Button>
      </div>
    </PageBody>
  );
}
