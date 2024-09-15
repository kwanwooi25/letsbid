export const PATHS = {
  HOME: '/',
  SIGN_UP: '/auth/sign-up',
  SIGN_IN: '/auth/sign-in',
  GROUP: '/group',
} as const;

export const API_ROUTE = {
  SIGN_IN: '/api/auth/signin',
  SIGN_OUT: '/api/auth/signout',
  USER: '/api/user',
  USER_LOGIN: '/api/user/login',
  GROUP: '/api/group',
  INVITATION: '/api/invitation',
} as const;
