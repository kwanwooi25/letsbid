import PageBody from '@/components/layouts/PageBody';
import WithLabel from '@/components/common/WithLabel';
import { Skeleton } from '@/components/ui/skeleton';

export default function ArticleFormSkeleton() {
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
        actionButtonCount={1}
      />
      <PageBody className="flex flex-col gap-4">
        <Skeleton.Input />
        <WithLabel label={<Skeleton className="h-5 w-20" />}>
          <Skeleton className="h-[50vh] w-full" />
        </WithLabel>
      </PageBody>
    </div>
  );
}
