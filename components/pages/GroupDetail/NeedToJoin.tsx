'use client';

import PageBody from '@/components/layouts/PageBody';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { useFormDialog } from '@/context/FormDialog';
import { joinGroupMutationOptions } from '@/features/group/mutation';
import { getGroupDetailQueryOptions } from '@/features/group/query';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useCallbackUrl } from '@/hooks/useCallbackUrl';
import { cn } from '@/lib/utils';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { LucideLock, LucideLockOpen } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useGroupDetailRouter } from './useGroupDetailRouter';

export default function NeedToJoinGroup() {
  const router = useRouter();
  const { toast } = useToast();
  const { openForm } = useFormDialog();
  const params = useParams();
  const groupId = params.groupId as string;
  const { data: group } = useSuspenseQuery(getGroupDetailQueryOptions(groupId));
  const { mutateAsync: joinGroup } = useMutation(joinGroupMutationOptions);
  const {} = useGroupDetailRouter();
  const { handleAxiosError } = useAxiosError();
  const callbackUrl = useCallbackUrl();

  const { name, description, isPrivate } = group;

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
      <div className="flex flex-col items-center gap-4 p-4">
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
        <Divider className="w-full mt-10" />
      </div>
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
