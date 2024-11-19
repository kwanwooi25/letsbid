'use client';

import PageToolbar from '@/components/layouts/PageToolbar';
import { Skeleton } from '@/components/ui/skeleton';
import GroupDetailTabsList from './GroupDetailTabsList';
import { useGroupDetailTabs } from '../useGroupDetailTabs';

export default function GroupDetailPageToolbarSkeleton() {
  const { tab } = useGroupDetailTabs();

  return (
    <PageToolbar className="flex items-center gap-4">
      <GroupDetailTabsList />
      {tab === 'auctionCases' && <Skeleton className="h-[40px] w-full" />}
      {tab === 'members' && <Skeleton className="h-[28px] w-[110px]" />}
    </PageToolbar>
  );
}
