import BidDetailSkeleton from '@/components/BidDetail/skeleton';
import { Button } from '@/components/ui/button';

export default function MyBidSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto px-6 py-8 border border-primary-foreground shadow-lg">
      <BidDetailSkeleton />

      <div className="flex items-center justify-between gap-4 mt-4">
        <Button className="mt-4" variant="outline" disabled>
          입찰표 수정
        </Button>
        <Button className="mt-4" variant="destructive" disabled>
          입찰 취소
        </Button>
      </div>
    </div>
  );
}
