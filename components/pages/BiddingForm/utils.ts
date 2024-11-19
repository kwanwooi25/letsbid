import { BidWithUser } from '@/features/bid/types';
import { BiddingFormSchema } from './formSchema';

export function getDefaultFormValues({
  auctionCaseId,
  bid,
}: {
  auctionCaseId?: string;
  bid?: BidWithUser;
}): BiddingFormSchema {
  if (bid) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, ...restBid } = bid;
    return {
      ...restBid,
      excludedReason: restBid.excludedReason ?? '',
    };
  }

  return {
    expectedSalePrice: 0,
    acquisitionCost: 0,
    evacuationCost: 0,
    repairCost: 0,
    brokerageFee: 0,
    estimatedInterest: 0,
    otherCost: 0,
    expectedProfit: 0,
    biddingPrice: 0,
    isExcluded: false,
    excludedReason: '',
    auctionCaseId,
  };
}
