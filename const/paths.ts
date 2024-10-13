export const PATHS = {
  HOME: '/',
  SIGN_UP: '/auth/sign-up',
  SIGN_IN: '/auth/sign-in',
  GROUP: '/group',
  CREATE_GROUP: '/group/create',
  INVITE_MEMBERS: '/invite-members',
  AUCTION_CASE: '/auction-case',
  CREATE_AUCTION_CASE: '/auction-case/create',
  BID: '/bid',
  ME: '/me',
  EDIT_USER_PROFILE: '/me/edit',
  INVITATION: '/invitation',
  MY_BID_HISTORY: '/me/bid-history',
} as const;

export const API_ROUTE = {
  SIGN_IN: '/api/auth/signin',
  SIGN_OUT: '/api/auth/signout',
  USER: '/api/user',
  USER_LOGIN: '/api/user/login',
  GROUP: '/api/group',
  INVITATION: '/api/invitation',
  AUCTION_CASE: '/api/auction-case',
  BID: '/api/bid',
} as const;
