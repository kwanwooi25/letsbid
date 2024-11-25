'use client';

import PageBody from '@/components/layouts/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import UserDetail from './UserDetail';

export default function UserProfileSkeleton() {
  return (
    <div className="max-w-2xl lg:max-w-5xl mx-auto">
      <Skeleton.PageHeader className="lg:mx-[176px]" title="내 정보" actionButtonCount={1} />
      <PageBody className="py-4 lg:mx-[176px]">
        <UserDetail.Skeleton />
      </PageBody>
    </div>
  );
}
