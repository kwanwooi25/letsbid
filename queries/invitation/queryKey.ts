const queryKeys = {
  list: (type: 'received' | 'sent') => ['invitations', type],
} as const;

export { queryKeys as invitationQueryKeys };
