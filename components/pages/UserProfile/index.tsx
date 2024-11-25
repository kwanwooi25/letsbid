'use client';

import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import { Button } from '@/components/ui/button';
import { useUserRouter } from '@/features/user/useUserRouter';
import UserDetail from './UserDetail';

export default function UserProfile() {
  const { moveToEditUserProfile } = useUserRouter();

  return (
    <>
      <PageHeader className="max-w-lg" title="내 정보">
        <div className="flex items-center gap-2">
          <Button onClick={moveToEditUserProfile} type="button">
            정보 수정
          </Button>
        </div>
      </PageHeader>
      <PageBody className="max-w-lg">
        <UserDetail />
      </PageBody>
    </>
  );
}
