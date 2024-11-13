'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import UserDetail from './UserDetail';
import { useUserProfileRouter } from './useUserProfileRouter';

export default function UserProfile() {
  const { moveToEditUserProfile } = useUserProfileRouter();

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
