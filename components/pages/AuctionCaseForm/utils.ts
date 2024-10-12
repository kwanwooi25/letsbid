import { AuctionCaseLike } from '@/types/auctionCase';
import { addDays, setMinutes } from 'date-fns';
import { AuctionCaseFormSchema } from './formSchema';

export function getDefaultFormValues({
  groupId,
  auctionCase,
}: {
  groupId?: string;
  auctionCase?: AuctionCaseLike | null;
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
    bidStartsAt: setMinutes(new Date(), 0),
    bidEndsAt: setMinutes(addDays(new Date(), 1), 0),
    groupId,
  };
}
