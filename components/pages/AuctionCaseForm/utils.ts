import { AuctionCaseLike } from '@/features/auction-case/types';
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
    const { address, addressDetail, images, bidStartsAt, bidEndsAt, actualBidStartsAt } =
      auctionCase;

    return {
      ...auctionCase,
      address: address ?? '',
      addressDetail: addressDetail ?? '',
      images,
      imagesToUpload: [],
      imagesToDelete: [],
      bidStartsAt: new Date(bidStartsAt),
      bidEndsAt: new Date(bidEndsAt),
      actualBidStartsAt: actualBidStartsAt ? new Date(actualBidStartsAt) : undefined,
    };
  }

  return {
    caseName: '',
    address: '',
    addressDetail: '',
    images: [],
    imagesToUpload: [],
    imagesToDelete: [],
    bidStartsAt: setMinutes(new Date(), 0),
    bidEndsAt: setMinutes(addDays(new Date(), 1), 0),
    appraisedValue: 0,
    startingBid: 0,
    officialValue: 0,
    hasElevator: false,
    groupId,
  };
}
