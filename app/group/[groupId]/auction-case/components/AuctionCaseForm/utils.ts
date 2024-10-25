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
    const { address, addressDetail, image, bidStartsAt, bidEndsAt, actualBidStartsAt } =
      auctionCase;

    return {
      ...auctionCase,
      address: address ?? '',
      addressDetail: addressDetail ?? '',
      image: image ?? '',
      bidStartsAt: new Date(bidStartsAt),
      bidEndsAt: new Date(bidEndsAt),
      actualBidStartsAt: actualBidStartsAt ? new Date(actualBidStartsAt) : undefined,
    };
  }

  return {
    caseName: '',
    address: '',
    addressDetail: '',
    image: '',
    bidStartsAt: setMinutes(new Date(), 0),
    bidEndsAt: setMinutes(addDays(new Date(), 1), 0),
    appraisedValue: 0,
    startingBid: 0,
    officialValue: 0,
    hasElevator: false,
    groupId,
  };
}
