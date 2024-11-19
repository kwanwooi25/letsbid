import { categorizeAuctionCases } from '@/features/auction-case/utils';
import { AuctionCaseLike, AuctionCaseStatus } from '@/features/auction-case/types';
import { useQuery } from '@tanstack/react-query';

export function useCategorizedAuctionCases(
  auctionCases: AuctionCaseLike[],
): Record<AuctionCaseStatus, AuctionCaseLike[]> {
  const { data } = useQuery({
    queryKey: ['categorizedAuctionCases'],
    queryFn: () => categorizeAuctionCases(auctionCases),
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });

  return data ?? { BIDDING: [], BEFORE_BIDDING: [], FINISHED_BIDDING: [] };
}
