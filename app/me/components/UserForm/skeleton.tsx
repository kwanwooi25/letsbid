import PageBody from '@/components/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import UserImage from '@/components/UserImage';

export default function UserFormSkeleton() {
  return (
    <div className="max-w-lg mx-auto">
      <Skeleton.PageHeader actionButtonCount={2} />
      <PageBody className="flex items-center gap-4">
        <UserImage />
        <div className="flex flex-col gap-1">
          <Skeleton.Input hideLabel />
          <Skeleton className="h-[20px] w-[180px]" />
        </div>
      </PageBody>
    </div>
  );
}
