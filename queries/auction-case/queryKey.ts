const queryKeys = {
  list: (groupId: string) => ['auctionCases', groupId],
  detail: (auctionCaseId: string) => ['auctionCase', auctionCaseId],
} as const;

export { queryKeys as auctionCaseQueryKeys };
