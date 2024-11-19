import PageBody from '@/components/layouts/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import UserImage from '@/components/common/UserImage';

export default function UserFormSkeleton() {
  return (
    <div className="max-w-lg mx-auto">
      <Skeleton.PageHeader actionButtonCount={2} />
      <PageBody className="flex items-center gap-4">
        <UserImage className="self-start" />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton.Input />
          <Skeleton.Input />
          <Skeleton.Input />
        </div>
      </PageBody>
    </div>
  );
}
