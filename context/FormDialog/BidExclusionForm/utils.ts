import { BidWithUser } from '@/types/bid';
import { BidExclusionFormSchema } from './formSchema';

export function getDefaultFormValues(bid?: BidWithUser): BidExclusionFormSchema {
  if (!bid) {
    return {
      isExcluded: false,
      excludedReason: '',
    };
  }

  const { id, isExcluded, excludedReason } = bid;

  return { id, isExcluded, excludedReason: excludedReason ?? '' };
}
