import { BidWithUser } from '@/features/bid/types';
import { BidExclusionFormSchema } from './formSchema';

export function getDefaultFormValues(bid?: BidWithUser): BidExclusionFormSchema {
  if (!bid) {
    return {
      isExcluded: true,
      excludedReason: '',
    };
  }

  const { id, excludedReason } = bid;

  return { id, isExcluded: true, excludedReason: excludedReason ?? '' };
}
