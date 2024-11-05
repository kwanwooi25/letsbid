const queryKeys = {
  list: (type: 'my' | 'all' | 'archived') => ['groups', type],
  detail: (id: string) => ['group', id],
} as const;

export { queryKeys as groupQueryKeys };
