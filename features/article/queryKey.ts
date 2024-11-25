const queryKeys = {
  list: (auctionCaseId?: string) => ['articles', auctionCaseId],
  detail: (articleId?: string) => ['article', articleId],
  likes: (articleId?: string) => ['likesOnArticle', articleId],
  views: (articleId?: string) => ['viewsOnArticle', articleId],
} as const;

export { queryKeys as articleQueryKeys };
