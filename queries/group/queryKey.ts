const queryKeys = {
  myGroupList: ['my-groups'],
  list: ['groups'],
  detail: (id: string) => ['group', id],
} as const;

export { queryKeys as groupQueryKeys };
