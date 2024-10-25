import { Skeleton } from '@/components/ui/skeleton';
import { getFullAddress } from '@/lib/auctionCase';
import { AuctionCaseLike } from '@/types/auctionCase';

export default function AuctionCaseTitle({ auctionCase }: Props) {
  const { caseName, address, addressDetail } = auctionCase;

  const fullAddress = getFullAddress({ address, addressDetail });

  return (
    <div className="flex-1 flex flex-col items-start gap-1">
      <span className="text-lg font-bold">{caseName}</span>
      {!!fullAddress && (
        <span className="text-xs font-semibold text-primary/50">{fullAddress}</span>
      )}
    </div>
  );
}

function AuctionCaseTitleSkeleton() {
  return (
    <div className="flex-1 flex flex-col items-start gap-1">
      <Skeleton className="h-[28px] w-[100px]" />
      <Skeleton className="h-[16px] w-full max-w-[360px]" />
    </div>
  );
}

AuctionCaseTitle.Skeleton = AuctionCaseTitleSkeleton;

type Props = {
  auctionCase: AuctionCaseLike;
};
