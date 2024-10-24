import PageBody from '@/components/PageBody';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuctionCaseFormSkeleton() {
  return (
    <div className="max-w-xl mx-auto">
      <Skeleton.PageHeader backButton actionButtonCount={1} />
      <PageBody className="flex flex-col gap-4">
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton className="w-full h-[114px]" />
      </PageBody>
    </div>
  );
}
