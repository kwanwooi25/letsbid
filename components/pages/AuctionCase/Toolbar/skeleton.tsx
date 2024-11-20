import PageToolbar from '@/components/layouts/PageToolbar';
import Divider from '@/components/ui/divider';
import { Skeleton } from '@/components/ui/skeleton';
import { LucideChevronRight } from 'lucide-react';
import AuctionCaseDetailTabsList from './AuctionCaseDetailTabsList';

export default function AuctionCasePageToolbarSkeleton() {
  return (
    <PageToolbar className="flex flex-col gap-4">
      <AuctionCaseDetailTabsList />
      <div className="flex flex-col items-start sm:flex-row sm:items-center lg:flex-col justify-between gap-4">
        <div className="w-full flex items-center justify-between gap-4 lg:flex-col lg:gap-0">
          <div className="flex flex-col items-start gap-1 shrink-0 lg:w-full lg:items-center">
            <Skeleton className="h-[28px] w-[70px] rounded-full" />
            <Skeleton className="h-[28px] w-[80px]" />
            <Divider className="hidden w-full lg:block" />
          </div>
          <div className="flex flex-col gap-1 lg:w-full lg:items-center">
            <div className="flex items-center gap-2 lg:flex-col">
              <Skeleton className="h-[16px] sm:h-[20px] w-[110px]" />
              <LucideChevronRight className="w-3 h-3 lg:rotate-90 text-primary/70" />
              <Skeleton className="h-[16px] sm:h-[20px] w-[110px]" />
            </div>
            <Divider className="w-full my-1 lg:my-4" />
            <div className="flex items-center gap-2 justify-end lg:flex-col lg:gap-1">
              <Skeleton className="h-[20px] w-[50px]" />
              <Skeleton className="h-[28px] w-[115px]" />
            </div>
          </div>
        </div>
      </div>
    </PageToolbar>
  );
}
