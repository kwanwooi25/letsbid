import UserImage from '@/components/common/UserImage';
import PageBody from '@/components/layouts/PageBody';
import { Skeleton } from '@/components/ui/skeleton';

export default function ArticleDetailSkeleton() {
  return (
    <div className="max-w-2xl lg:max-w-5xl mx-auto">
      <Skeleton.PageHeader
        className="lg:mx-[176px]"
        title={
          <div className="flex flex-col gap-1">
            <Skeleton className="h-[28px] w-[100px]" />
            <Skeleton className="h-[20px] w-[80px]" />
          </div>
        }
        backButton
        actionButtonCount={1}
        actionButtonType="icon"
      />
      <PageBody className="lg:mx-[176px] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-[28px] w-[100px]" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-[20px] w-[15px]" />
            <Skeleton className="h-[40px] w-[40px] rounded-full" />
          </div>
        </div>
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
