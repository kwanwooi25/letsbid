const queryKeys = {
  detail: (bidId?: string) => ['bid', bidId],
} as const;

export { queryKeys as bidQueryKeys };
