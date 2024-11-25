'use client';

import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import { Button } from '@/components/ui/button';
import { useUserRouter } from '@/features/user/useUserRouter';
import UserDetail from './UserDetail';

export default function UserProfile() {
  const { moveToEditUserProfile } = useUserRouter();

  return (
    <div className="max-w-2xl lg:max-w-5xl mx-auto">
      <PageHeader className="lg:mx-[176px]" title="내 정보">
        <div className="flex items-center gap-2">
          <Button onClick={moveToEditUserProfile} type="button">
            정보 수정
          </Button>
        </div>
      </PageHeader>
      <PageBody className="py-4 lg:mx-[176px]">
        <UserDetail />
      </PageBody>
    </div>
  );
}
