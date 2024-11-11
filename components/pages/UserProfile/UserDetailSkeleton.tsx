import { Skeleton } from '@/components/ui/skeleton';
import UserImage from '@/components/UserImage';

export default function UserDetailSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <UserImage className="self-start" />

      <div className="flex flex-col gap-2">
        <Skeleton className="h-[28px] w-[80px]" />
        <Skeleton className="h-[20px] w-[180px]" />
        <Skeleton className="h-[20px] w-[100px]" />
      </div>
    </div>
  );
}
