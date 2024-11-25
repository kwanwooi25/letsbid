import PageBody from '@/components/layouts/PageBody';
import { Skeleton } from '@/components/ui/skeleton';

export default function GroupFormSkeleton() {
  return (
    <div className="max-w-2xl lg:max-w-5xl mx-auto">
      <Skeleton.PageHeader className="lg:mx-[176px]" backButton actionButtonCount={1} />

      <PageBody className="flex flex-col gap-4 lg:mx-[176px]">
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton.Input />
        <div className="flex gap-4 items-start mt-7">
          <div className="h-[40px] flex items-center space-x-2 shrink-0">
            <Skeleton className="h-[24px] w-[44px] rounded-full" />
            <Skeleton className="ml-[8px] h-[14px] w-[38px]" />
          </div>
        </div>
      </PageBody>
    </div>
  );
}
