const queryKeys = {
  detail: (bidId?: string) => ['bid', bidId],
  my_history: ['my_bid_history'],
} as const;

export { queryKeys as bidQueryKeys };
