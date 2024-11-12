import PageBody from '@/components/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import UserDetailSkeleton from './UserDetailSkeleton';

export default function UserProfileSkeleton() {
  return (
    <>
      <Skeleton.PageHeader className="max-w-lg" title="내 정보" actionButtonCount={1} />
      <PageBody className="max-w-lg">
        <UserDetailSkeleton />
      </PageBody>
    </>
  );
}
