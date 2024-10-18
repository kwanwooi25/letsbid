'use client';

import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { GROUP_CREATION_ALLOWED_USERS } from './const';

export default function HeaderButtons() {
  const session = useSession();
  const router = useRouter();
  const currentUrl = useCurrentUrl();

  const moveToCreateGroup = () =>
    router.push(`${PATHS.CREATE_GROUP}?callbackUrl=${currentUrl}`, { scroll: false });

  return (
    <div className="flex items-center gap-2">
      {!!session?.data?.user?.email &&
        GROUP_CREATION_ALLOWED_USERS.includes(session?.data?.user?.email) && (
          <Button type="button" onClick={moveToCreateGroup}>
            그룹 생성
          </Button>
        )}
    </div>
  );
}
