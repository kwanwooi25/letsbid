'use client';

import PageBody from '@/components/layouts/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import UserDetail from './UserDetail';

export default function UserProfileSkeleton() {
  return (
    <>
      <Skeleton.PageHeader className="max-w-lg" title="내 정보" actionButtonCount={1} />
      <PageBody className="max-w-lg">
        <UserDetail.Skeleton />
      </PageBody>
    </>
  );
}
