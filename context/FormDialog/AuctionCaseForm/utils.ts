import { AuctionCaseFormSchema } from './formSchema';

export function getDefaultFormValues({ groupId }: { groupId?: string }): AuctionCaseFormSchema {
  return {
    caseYear: '',
    caseNumber: '',
    bidStartsAt: new Date(),
    bidEndsAt: new Date(),
    groupId,
  };
}
