import PageBody from '@/components/layouts/PageBody';
import Divider from '@/components/ui/divider';
import { Skeleton } from '@/components/ui/skeleton';

export default function BiddingFormSkeleton() {
  return (
    <div className="max-w-lg mx-auto">
      <Skeleton.PageHeader
        title={
          <div className="flex flex-col gap-1">
            <Skeleton className="h-[28px] w-[100px]" />
            <Skeleton className="h-[20px] w-[80px]" />
          </div>
        }
        backButton
        actionButtonCount={1}
      />
      <PageBody className="flex flex-col gap-4 mb-8">
        <Skeleton.Input />

        <Divider>비용</Divider>
        <div className="flex flex-col gap-4">
          <Skeleton.Input />
          <Skeleton.Input />
          <Skeleton.Input />
          <Skeleton.Input />
          <Skeleton.Input />
          <Skeleton.Input />
        </div>

        <Divider>수익</Divider>
        <div className="flex flex-col gap-4">
          <Skeleton.Input />
        </div>

        <Divider>입찰가</Divider>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-[28px] w-full" />
        </div>
      </PageBody>
    </div>
  );
}
