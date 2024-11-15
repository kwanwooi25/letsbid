const queryKeys = {
  list: (auctionCaseId?: string) => ['articles', auctionCaseId],
  detail: (articleId?: string) => ['article', articleId],
} as const;

export { queryKeys as articleQueryKeys };
