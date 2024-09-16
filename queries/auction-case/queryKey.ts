const queryKeys = {
  list: (groupId: string) => ['auctionCases', groupId],
} as const;

export { queryKeys as auctionCaseQueryKeys };
