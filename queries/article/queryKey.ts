const queryKeys = {
  list: (auctionCaseId?: string) => ['articles', auctionCaseId],
} as const;

export { queryKeys as articleQueryKeys };
