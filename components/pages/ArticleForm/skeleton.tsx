import WithLabel from '@/components/common/WithLabel';
import PageBody from '@/components/layouts/PageBody';
import { Skeleton } from '@/components/ui/skeleton';

export default function ArticleFormSkeleton() {
  return (
    <div className="max-w-2xl lg:max-w-5xl mx-auto">
      <Skeleton.PageHeader
        className="lg:mx-[176px]"
        backButton
        actionButtonCount={1}
        title={
          <div className="flex flex-col gap-1">
            <Skeleton className="h-[28px] w-[100px]" />
            <Skeleton className="h-[20px] w-[80px]" />
          </div>
        }
      />
      <PageBody className="flex flex-col gap-4 lg:mx-[176px]">
        <Skeleton.Input />
        <WithLabel label={<Skeleton className="h-5 w-20" />}>
          <Skeleton className="h-[50vh] w-full" />
        </WithLabel>
      </PageBody>
    </div>
  );
}
