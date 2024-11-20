'use client';

import PageBody from '@/components/layouts/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import UserImage from '@/components/common/UserImage';

export default function ArticleDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto">
      <Skeleton.PageHeader
        title={
          <div className="flex flex-col gap-1">
            <Skeleton className="h-[28px] w-[100px]" />
            <Skeleton className="h-[20px] w-[80px]" />
          </div>
        }
        backButton
        actionButtonCount={2}
      />
      <PageBody className="flex flex-col gap-4">
        <Skeleton className="h-[28px] w-[100px]" />
        <div className="self-end flex items-center gap-2">
          <UserImage size={24} />
          <Skeleton className="h-[20px] w-[40px]" />
        </div>
        <Skeleton className="h-[20px] w-[200px] self-end" />
        <Skeleton className="h-[50vh] w-full" />
      </PageBody>
    </div>
  );
}
