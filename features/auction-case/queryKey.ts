import { AuctionCaseListQueryOptions } from './types';

const queryKeys = {
  list: (groupId: string, options?: AuctionCaseListQueryOptions) => {
    if (options) {
      return ['auctionCases', groupId, options];
    }

    return ['auctionCases', groupId];
  },
  detail: (auctionCaseId?: string) => ['auctionCase', auctionCaseId],
} as const;

export { queryKeys as auctionCaseQueryKeys };
