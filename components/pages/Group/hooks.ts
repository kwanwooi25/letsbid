import { categorizeAuctionCases } from '@/lib/auctionCase';
import { AuctionCase } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

export function useCategorizedAuctionCases(auctionCases: AuctionCase[]) {
  const { data } = useQuery({
    queryKey: ['categorizedAuctionCases'],
    queryFn: () => categorizeAuctionCases(auctionCases),
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });

  return data ?? { bidding: [], beforeBidding: [], finishedBidding: [] };
}
