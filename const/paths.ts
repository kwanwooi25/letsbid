export const PATHS = {
  HOME: '/',
  GROUP: '/group',
} as const;

export const API_ROUTE = {
  SIGN_IN: '/api/auth/signin',
  SIGN_OUT: '/api/auth/signout',
  GET_GROUPS: '/api/group',
  CREATE_GROUP: '/api/group',
  UPDATE_GROUP: '/api/group',
} as const;
