import PageBody from '@/components/layouts/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import UserImage from '@/components/common/UserImage';

export default function UserFormSkeleton() {
  return (
    <div className="max-w-2xl lg:max-w-5xl mx-auto">
      <Skeleton.PageHeader className="lg:mx-[176px]" actionButtonCount={2} />
      <PageBody className="flex items-center gap-4 lg:mx-[176px]">
        <UserImage containerClassName="self-start" />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton.Input />
          <Skeleton.Input />
          <Skeleton.Input />
        </div>
      </PageBody>
    </div>
  );
}
