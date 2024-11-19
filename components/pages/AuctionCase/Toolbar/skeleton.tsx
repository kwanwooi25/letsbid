'use client';

import PageToolbar from '@/components/layouts/PageToolbar';
import { Skeleton } from '@/components/ui/skeleton';
import AuctionCaseDetailTabsList from './AuctionCaseDetailTabsList';

export default function AucitonCasePageToolbarSkeleton() {
  return (
    <PageToolbar className="flex flex-col gap-4">
      <AuctionCaseDetailTabsList />
      <div className="flex flex-col items-start sm:flex-row sm:items-center lg:flex-col justify-between gap-4">
        <div className="flex items-center gap-4 lg:flex-col">
          <Skeleton className="h-[28px] w-[70px] rounded-full" />
          <div className="flex flex-col gap-1 lg:items-center">
            <Skeleton className="h-[20px] w-[140px] rounded-full" />
            <Skeleton className="h-[28px] w-[110px] rounded-full" />
          </div>
        </div>
      </div>
    </PageToolbar>
  );
}
