import PageBody from '@/components/layouts/PageBody';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuctionCaseFormSkeleton() {
  return (
    <div className="max-w-2xl mx-auto">
      <Skeleton.PageHeader backButton actionButtonCount={1} />
      <PageBody className="flex flex-col gap-4 md:gap-6">
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton.Input />

        <div className="flex flex-col gap-4 md:flex-row">
          <Skeleton.Input className="flex-1" />
          <Skeleton.Input className="flex-1" />
          <Skeleton.Input className="flex-1" />
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <Skeleton.Input className="flex-1" />
          <Skeleton.Input className="flex-1" />
          <Skeleton.Input className="flex-1" />
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <Skeleton.Input className="flex-1" />
          <Skeleton.Input className="flex-1" />
          <Skeleton.Input className="flex-1" />
        </div>

        <Skeleton.Input />

        <Skeleton className="w-full h-[114px]" />
      </PageBody>
    </div>
  );
}
