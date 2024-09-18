import { AUCTION_CASE_STATUS_TRANSLATIONS } from '@/const/auctionCase';
import { getAuctionCaseStatus } from '@/lib/auctionCase';
import { cn } from '@/lib/utils';
import { AuctionCase } from '@prisma/client';

export default function AuctionCaseStatusBadge({ auctionCase, className, size = 'md' }: Props) {
  const status = getAuctionCaseStatus(auctionCase);
  const label = AUCTION_CASE_STATUS_TRANSLATIONS[status];
  const color = (() => {
    if (status === 'BEFORE_BIDDING') return 'yellow';
    if (status === 'BIDDING') return 'green';
    return 'gray';
  })();

  return (
    <span
      className={cn(
        'rounded-full font-semibold',
        size === 'sm' && 'px-2 py-1 text-xs',
        size === 'md' && 'px-3 py-1 text-sm',
        size === 'lg' && 'px-4 py-2 text-md',
        color === 'gray' && 'text-gray-100 bg-gray-700',
        color === 'yellow' && 'text-yellow-100 bg-yellow-700',
        color === 'green' && 'text-green-100 bg-green-700',
        className,
      )}
    >
      {label}
    </span>
  );
}

type Props = {
  auctionCase: AuctionCase;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};
