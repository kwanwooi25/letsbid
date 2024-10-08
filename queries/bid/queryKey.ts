const queryKeys = {
  detail: (bidId?: string) => ['bid', bidId],
  history: (userId?: string) => ['bidHistory', userId],
} as const;

export { queryKeys as bidQueryKeys };
