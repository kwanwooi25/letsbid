import { AuctionCase } from '@prisma/client';
import { AuctionCaseFormSchema } from './formSchema';

export function getDefaultFormValues({
  groupId,
  auctionCase,
}: {
  groupId?: string;
  auctionCase?: AuctionCase;
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
    caseYear: '',
    caseNumber: '',
    bidStartsAt: new Date(),
    bidEndsAt: new Date(),
    groupId,
  };
}
