export type SuccessResponse<D, M = PaginationMeta> = {
  result: 'SUCCESS';
  data: D;
  meta?: M;
  message?: string;
};

export type FailedResponse = {
  result: 'FAILED';
  data: null;
  meta: null;
  message?: string;
};

export type PaginationMeta = {
  page: number;
  per: number;
  totalCount: number;
  totalPages: number;
  hasMore: boolean;
};
