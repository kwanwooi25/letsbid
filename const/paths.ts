export const PATHS = {
  HOME: '/',
  SIGN_UP: '/auth/sign-up',
  SIGN_IN: '/auth/sign-in',
  GROUP: '/group',
  CREATE_GROUP: '/group/create',
  AUCTION_CASE: '/auction-case',
  CREATE_AUCTION_CASE: '/auction-case/create',
  BID: '/bid',
  ARTICLE: '/article',
  ME: '/me',
  EDIT_USER_PROFILE: '/me/edit',
  MY_BID_HISTORY: '/me/bid-history',
} as const;

export const API_ROUTE = {
  SIGN_IN: '/api/auth/signin',
  SIGN_OUT: '/api/auth/signout',
  USER: '/api/user',
  USER_LOGIN: '/api/user/login',
  GROUP: '/api/group',
  JOINED_GROUP_LIST: '/api/group/joined',
  JOINABLE_GROUP_LIST: '/api/group/joinable',
  ARCHIVED_GROUP: '/api/group/archived',
  AUCTION_CASE_LIST: '/api/auction-case/list',
  AUCTION_CASE: '/api/auction-case',
  BID: '/api/bid',
  ARTICLE: '/api/article',
  IMAGE: '/api/image',
} as const;

export const NAV_LIST = [
  {
    href: PATHS.GROUP,
    label: '그룹',
    protected: true,
  },
] as const;
