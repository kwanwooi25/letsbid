import { AuctionCaseFormSchema } from './formSchema';

export function getDefaultFormValues(): AuctionCaseFormSchema {
  return {
    caseYear: '',
    caseNumber: '',
    bidStartsAt: new Date(),
    bidEndsAt: new Date(),
  };
}
