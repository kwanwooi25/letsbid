export const PATHS = {
  HOME: '/',
  SIGN_UP: '/auth/sign-up',
  SIGN_IN: '/auth/sign-in',
  GROUP: '/group',
  CREATE_GROUP: '/group/create',
  AUCTION_CASE: '/auction-case',
  CREATE_AUCTION_CASE: '/auction-case/create',
  BID: '/bid',
  ME: '/me',
  EDIT_USER_PROFILE: '/me/edit',
  MY_BID_HISTORY: '/me/bid-history',
  USER_GUIDE: '/user-guide',
} as const;

export const API_ROUTE = {
  SIGN_IN: '/api/auth/signin',
  SIGN_OUT: '/api/auth/signout',
  USER: '/api/user',
  USER_LOGIN: '/api/user/login',
  GROUP: '/api/group',
  MY_GROUP: '/api/group/my',
  ARCHIVED_GROUP: '/api/group/archived',
  AUCTION_CASE: '/api/auction-case',
  BID: '/api/bid',
} as const;

export const NAV_LIST = [
  {
    href: PATHS.GROUP,
    label: '그룹',
    protected: true,
  },
] as const;
