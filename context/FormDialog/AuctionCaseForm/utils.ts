import { AuctionCaseLike } from '@/types/auctionCase';
import { AuctionCaseFormSchema } from './formSchema';

export function getDefaultFormValues({
  groupId,
  auctionCase,
}: {
  groupId?: string;
  auctionCase?: AuctionCaseLike;
}): AuctionCaseFormSchema {
  if (auctionCase) {
    const { bidStartsAt, bidEndsAt } = auctionCase;
    return {
      ...auctionCase,
      bidStartsAt: new Date(bidStartsAt),
      bidEndsAt: new Date(bidEndsAt),
    };
  }

  return {
    caseName: '',
    bidStartsAt: new Date(),
    bidEndsAt: new Date(),
    groupId,
  };
}
