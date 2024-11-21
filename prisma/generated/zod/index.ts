import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','password','image','mobile','points','createdAt','updatedAt']);

export const AccountScalarFieldEnumSchema = z.enum(['userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state','createdAt','updatedAt']);

export const SessionScalarFieldEnumSchema = z.enum(['sessionToken','userId','expires','createdAt','updatedAt']);

export const GroupScalarFieldEnumSchema = z.enum(['id','name','description','hostId','isPrivate','password','maxMembers','createdAt','updatedAt','archivedAt']);

export const UsersOnGroupsScalarFieldEnumSchema = z.enum(['userId','groupId','invitedBy','joinedAt']);

export const AuctionCaseScalarFieldEnumSchema = z.enum(['id','groupId','caseName','address','addressDetail','bidStartsAt','bidEndsAt','image','actualBidStartsAt','appraisedValue','startingBid','officialValue','area','floorLevel','floorPlan','hasElevator','completedYear','createdAt','updatedAt']);

export const BidScalarFieldEnumSchema = z.enum(['id','auctionCaseId','userId','expectedSalePrice','acquisitionCost','evacuationCost','repairCost','brokerageFee','estimatedInterest','otherCost','expectedProfit','biddingPrice','isExcluded','excludedReason','createdAt','updatedAt']);

export const ArticleScalarFieldEnumSchema = z.enum(['id','authorId','auctionCaseId','title','contentHtml','isPublished','createdAt','updatedAt']);

export const LikeOnArticleScalarFieldEnumSchema = z.enum(['id','userId','articleId','createdAt','updatedAt']);

export const AttachmentScalarFieldEnumSchema = z.enum(['id','articleId','fileName','url']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const UserOrderByRelevanceFieldEnumSchema = z.enum(['id','name','email','password','image','mobile']);

export const AccountOrderByRelevanceFieldEnumSchema = z.enum(['userId','type','provider','providerAccountId','refresh_token','access_token','token_type','scope','id_token','session_state']);

export const SessionOrderByRelevanceFieldEnumSchema = z.enum(['sessionToken','userId']);

export const GroupOrderByRelevanceFieldEnumSchema = z.enum(['id','name','description','hostId','password']);

export const UsersOnGroupsOrderByRelevanceFieldEnumSchema = z.enum(['userId','groupId','invitedBy']);

export const AuctionCaseOrderByRelevanceFieldEnumSchema = z.enum(['id','groupId','caseName','address','addressDetail','image','floorPlan']);

export const BidOrderByRelevanceFieldEnumSchema = z.enum(['id','auctionCaseId','userId','excludedReason']);

export const ArticleOrderByRelevanceFieldEnumSchema = z.enum(['id','authorId','auctionCaseId','title','contentHtml']);

export const LikeOnArticleOrderByRelevanceFieldEnumSchema = z.enum(['id','userId','articleId']);

export const AttachmentOrderByRelevanceFieldEnumSchema = z.enum(['id','articleId','fileName','url']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().nullable(),
  password: z.string().nullable(),
  image: z.string().nullable(),
  mobile: z.string().nullable(),
  points: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// GROUP SCHEMA
/////////////////////////////////////////

export const GroupSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().nullable(),
  hostId: z.string(),
  isPrivate: z.boolean(),
  password: z.string().nullable(),
  maxMembers: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  archivedAt: z.coerce.date().nullable(),
})

export type Group = z.infer<typeof GroupSchema>

/////////////////////////////////////////
// USERS ON GROUPS SCHEMA
/////////////////////////////////////////

export const UsersOnGroupsSchema = z.object({
  userId: z.string(),
  groupId: z.string(),
  invitedBy: z.string(),
  joinedAt: z.coerce.date(),
})

export type UsersOnGroups = z.infer<typeof UsersOnGroupsSchema>

/////////////////////////////////////////
// AUCTION CASE SCHEMA
/////////////////////////////////////////

export const AuctionCaseSchema = z.object({
  id: z.string().cuid(),
  groupId: z.string(),
  caseName: z.string(),
  address: z.string().nullable(),
  addressDetail: z.string().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  image: z.string().nullable(),
  actualBidStartsAt: z.coerce.date().nullable(),
  appraisedValue: z.number().int(),
  startingBid: z.number().int(),
  officialValue: z.number().int(),
  area: z.number().nullable(),
  floorLevel: z.number().int().nullable(),
  floorPlan: z.string().nullable(),
  hasElevator: z.boolean(),
  completedYear: z.number().int().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type AuctionCase = z.infer<typeof AuctionCaseSchema>

/////////////////////////////////////////
// BID SCHEMA
/////////////////////////////////////////

export const BidSchema = z.object({
  id: z.string().cuid(),
  auctionCaseId: z.string(),
  userId: z.string(),
  expectedSalePrice: z.number().int(),
  acquisitionCost: z.number().int(),
  evacuationCost: z.number().int(),
  repairCost: z.number().int(),
  brokerageFee: z.number().int(),
  estimatedInterest: z.number().int(),
  otherCost: z.number().int(),
  expectedProfit: z.number().int(),
  biddingPrice: z.number().int(),
  isExcluded: z.boolean(),
  excludedReason: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Bid = z.infer<typeof BidSchema>

/////////////////////////////////////////
// ARTICLE SCHEMA
/////////////////////////////////////////

export const ArticleSchema = z.object({
  id: z.string().cuid(),
  authorId: z.string(),
  auctionCaseId: z.string().nullable(),
  title: z.string().nullable(),
  contentHtml: z.string().nullable(),
  isPublished: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Article = z.infer<typeof ArticleSchema>

/////////////////////////////////////////
// LIKE ON ARTICLE SCHEMA
/////////////////////////////////////////

export const LikeOnArticleSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  articleId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type LikeOnArticle = z.infer<typeof LikeOnArticleSchema>

/////////////////////////////////////////
// ATTACHMENT SCHEMA
/////////////////////////////////////////

export const AttachmentSchema = z.object({
  id: z.string().cuid(),
  articleId: z.string().nullable(),
  fileName: z.string(),
  url: z.string(),
})

export type Attachment = z.infer<typeof AttachmentSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  Account: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  Session: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  groups: z.union([z.boolean(),z.lazy(() => UsersOnGroupsFindManyArgsSchema)]).optional(),
  bids: z.union([z.boolean(),z.lazy(() => BidFindManyArgsSchema)]).optional(),
  articles: z.union([z.boolean(),z.lazy(() => ArticleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  Account: z.boolean().optional(),
  Session: z.boolean().optional(),
  groups: z.boolean().optional(),
  bids: z.boolean().optional(),
  articles: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  password: z.boolean().optional(),
  image: z.boolean().optional(),
  mobile: z.boolean().optional(),
  points: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Account: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  Session: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  groups: z.union([z.boolean(),z.lazy(() => UsersOnGroupsFindManyArgsSchema)]).optional(),
  bids: z.union([z.boolean(),z.lazy(() => BidFindManyArgsSchema)]).optional(),
  articles: z.union([z.boolean(),z.lazy(() => ArticleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// GROUP
//------------------------------------------------------

export const GroupIncludeSchema: z.ZodType<Prisma.GroupInclude> = z.object({
  members: z.union([z.boolean(),z.lazy(() => UsersOnGroupsFindManyArgsSchema)]).optional(),
  auctionCases: z.union([z.boolean(),z.lazy(() => AuctionCaseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GroupCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const GroupArgsSchema: z.ZodType<Prisma.GroupDefaultArgs> = z.object({
  select: z.lazy(() => GroupSelectSchema).optional(),
  include: z.lazy(() => GroupIncludeSchema).optional(),
}).strict();

export const GroupCountOutputTypeArgsSchema: z.ZodType<Prisma.GroupCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => GroupCountOutputTypeSelectSchema).nullish(),
}).strict();

export const GroupCountOutputTypeSelectSchema: z.ZodType<Prisma.GroupCountOutputTypeSelect> = z.object({
  members: z.boolean().optional(),
  auctionCases: z.boolean().optional(),
}).strict();

export const GroupSelectSchema: z.ZodType<Prisma.GroupSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  hostId: z.boolean().optional(),
  isPrivate: z.boolean().optional(),
  password: z.boolean().optional(),
  maxMembers: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  archivedAt: z.boolean().optional(),
  members: z.union([z.boolean(),z.lazy(() => UsersOnGroupsFindManyArgsSchema)]).optional(),
  auctionCases: z.union([z.boolean(),z.lazy(() => AuctionCaseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GroupCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USERS ON GROUPS
//------------------------------------------------------

export const UsersOnGroupsIncludeSchema: z.ZodType<Prisma.UsersOnGroupsInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  group: z.union([z.boolean(),z.lazy(() => GroupArgsSchema)]).optional(),
}).strict()

export const UsersOnGroupsArgsSchema: z.ZodType<Prisma.UsersOnGroupsDefaultArgs> = z.object({
  select: z.lazy(() => UsersOnGroupsSelectSchema).optional(),
  include: z.lazy(() => UsersOnGroupsIncludeSchema).optional(),
}).strict();

export const UsersOnGroupsSelectSchema: z.ZodType<Prisma.UsersOnGroupsSelect> = z.object({
  userId: z.boolean().optional(),
  groupId: z.boolean().optional(),
  invitedBy: z.boolean().optional(),
  joinedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  group: z.union([z.boolean(),z.lazy(() => GroupArgsSchema)]).optional(),
}).strict()

// AUCTION CASE
//------------------------------------------------------

export const AuctionCaseIncludeSchema: z.ZodType<Prisma.AuctionCaseInclude> = z.object({
  group: z.union([z.boolean(),z.lazy(() => GroupArgsSchema)]).optional(),
  bids: z.union([z.boolean(),z.lazy(() => BidFindManyArgsSchema)]).optional(),
  articles: z.union([z.boolean(),z.lazy(() => ArticleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AuctionCaseCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AuctionCaseArgsSchema: z.ZodType<Prisma.AuctionCaseDefaultArgs> = z.object({
  select: z.lazy(() => AuctionCaseSelectSchema).optional(),
  include: z.lazy(() => AuctionCaseIncludeSchema).optional(),
}).strict();

export const AuctionCaseCountOutputTypeArgsSchema: z.ZodType<Prisma.AuctionCaseCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AuctionCaseCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AuctionCaseCountOutputTypeSelectSchema: z.ZodType<Prisma.AuctionCaseCountOutputTypeSelect> = z.object({
  bids: z.boolean().optional(),
  articles: z.boolean().optional(),
}).strict();

export const AuctionCaseSelectSchema: z.ZodType<Prisma.AuctionCaseSelect> = z.object({
  id: z.boolean().optional(),
  groupId: z.boolean().optional(),
  caseName: z.boolean().optional(),
  address: z.boolean().optional(),
  addressDetail: z.boolean().optional(),
  bidStartsAt: z.boolean().optional(),
  bidEndsAt: z.boolean().optional(),
  image: z.boolean().optional(),
  actualBidStartsAt: z.boolean().optional(),
  appraisedValue: z.boolean().optional(),
  startingBid: z.boolean().optional(),
  officialValue: z.boolean().optional(),
  area: z.boolean().optional(),
  floorLevel: z.boolean().optional(),
  floorPlan: z.boolean().optional(),
  hasElevator: z.boolean().optional(),
  completedYear: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  group: z.union([z.boolean(),z.lazy(() => GroupArgsSchema)]).optional(),
  bids: z.union([z.boolean(),z.lazy(() => BidFindManyArgsSchema)]).optional(),
  articles: z.union([z.boolean(),z.lazy(() => ArticleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AuctionCaseCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BID
//------------------------------------------------------

export const BidIncludeSchema: z.ZodType<Prisma.BidInclude> = z.object({
  auctionCase: z.union([z.boolean(),z.lazy(() => AuctionCaseArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const BidArgsSchema: z.ZodType<Prisma.BidDefaultArgs> = z.object({
  select: z.lazy(() => BidSelectSchema).optional(),
  include: z.lazy(() => BidIncludeSchema).optional(),
}).strict();

export const BidSelectSchema: z.ZodType<Prisma.BidSelect> = z.object({
  id: z.boolean().optional(),
  auctionCaseId: z.boolean().optional(),
  userId: z.boolean().optional(),
  expectedSalePrice: z.boolean().optional(),
  acquisitionCost: z.boolean().optional(),
  evacuationCost: z.boolean().optional(),
  repairCost: z.boolean().optional(),
  brokerageFee: z.boolean().optional(),
  estimatedInterest: z.boolean().optional(),
  otherCost: z.boolean().optional(),
  expectedProfit: z.boolean().optional(),
  biddingPrice: z.boolean().optional(),
  isExcluded: z.boolean().optional(),
  excludedReason: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  auctionCase: z.union([z.boolean(),z.lazy(() => AuctionCaseArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// ARTICLE
//------------------------------------------------------

export const ArticleIncludeSchema: z.ZodType<Prisma.ArticleInclude> = z.object({
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  auctionCase: z.union([z.boolean(),z.lazy(() => AuctionCaseArgsSchema)]).optional(),
  attachments: z.union([z.boolean(),z.lazy(() => AttachmentFindManyArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => LikeOnArticleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ArticleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ArticleArgsSchema: z.ZodType<Prisma.ArticleDefaultArgs> = z.object({
  select: z.lazy(() => ArticleSelectSchema).optional(),
  include: z.lazy(() => ArticleIncludeSchema).optional(),
}).strict();

export const ArticleCountOutputTypeArgsSchema: z.ZodType<Prisma.ArticleCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ArticleCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ArticleCountOutputTypeSelectSchema: z.ZodType<Prisma.ArticleCountOutputTypeSelect> = z.object({
  attachments: z.boolean().optional(),
  likes: z.boolean().optional(),
}).strict();

export const ArticleSelectSchema: z.ZodType<Prisma.ArticleSelect> = z.object({
  id: z.boolean().optional(),
  authorId: z.boolean().optional(),
  auctionCaseId: z.boolean().optional(),
  title: z.boolean().optional(),
  contentHtml: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  auctionCase: z.union([z.boolean(),z.lazy(() => AuctionCaseArgsSchema)]).optional(),
  attachments: z.union([z.boolean(),z.lazy(() => AttachmentFindManyArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => LikeOnArticleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ArticleCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LIKE ON ARTICLE
//------------------------------------------------------

export const LikeOnArticleIncludeSchema: z.ZodType<Prisma.LikeOnArticleInclude> = z.object({
  article: z.union([z.boolean(),z.lazy(() => ArticleArgsSchema)]).optional(),
}).strict()

export const LikeOnArticleArgsSchema: z.ZodType<Prisma.LikeOnArticleDefaultArgs> = z.object({
  select: z.lazy(() => LikeOnArticleSelectSchema).optional(),
  include: z.lazy(() => LikeOnArticleIncludeSchema).optional(),
}).strict();

export const LikeOnArticleSelectSchema: z.ZodType<Prisma.LikeOnArticleSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  articleId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  article: z.union([z.boolean(),z.lazy(() => ArticleArgsSchema)]).optional(),
}).strict()

// ATTACHMENT
//------------------------------------------------------

export const AttachmentIncludeSchema: z.ZodType<Prisma.AttachmentInclude> = z.object({
  article: z.union([z.boolean(),z.lazy(() => ArticleArgsSchema)]).optional(),
}).strict()

export const AttachmentArgsSchema: z.ZodType<Prisma.AttachmentDefaultArgs> = z.object({
  select: z.lazy(() => AttachmentSelectSchema).optional(),
  include: z.lazy(() => AttachmentIncludeSchema).optional(),
}).strict();

export const AttachmentSelectSchema: z.ZodType<Prisma.AttachmentSelect> = z.object({
  id: z.boolean().optional(),
  articleId: z.boolean().optional(),
  fileName: z.boolean().optional(),
  url: z.boolean().optional(),
  article: z.union([z.boolean(),z.lazy(() => ArticleArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mobile: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  points: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Account: z.lazy(() => AccountListRelationFilterSchema).optional(),
  Session: z.lazy(() => SessionListRelationFilterSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsListRelationFilterSchema).optional(),
  bids: z.lazy(() => BidListRelationFilterSchema).optional(),
  articles: z.lazy(() => ArticleListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mobile: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Account: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  Session: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsOrderByRelationAggregateInputSchema).optional(),
  bids: z.lazy(() => BidOrderByRelationAggregateInputSchema).optional(),
  articles: z.lazy(() => ArticleOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => UserOrderByRelevanceInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mobile: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  points: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Account: z.lazy(() => AccountListRelationFilterSchema).optional(),
  Session: z.lazy(() => SessionListRelationFilterSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsListRelationFilterSchema).optional(),
  bids: z.lazy(() => BidListRelationFilterSchema).optional(),
  articles: z.lazy(() => ArticleListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mobile: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  mobile: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  points: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => AccountOrderByRelevanceInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
})
.and(z.object({
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => SessionOrderByRelevanceInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  sessionToken: z.string()
})
.and(z.object({
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const GroupWhereInputSchema: z.ZodType<Prisma.GroupWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GroupWhereInputSchema),z.lazy(() => GroupWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GroupWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GroupWhereInputSchema),z.lazy(() => GroupWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  hostId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isPrivate: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  maxMembers: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  archivedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  members: z.lazy(() => UsersOnGroupsListRelationFilterSchema).optional(),
  auctionCases: z.lazy(() => AuctionCaseListRelationFilterSchema).optional()
}).strict();

export const GroupOrderByWithRelationInputSchema: z.ZodType<Prisma.GroupOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  maxMembers: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  archivedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  members: z.lazy(() => UsersOnGroupsOrderByRelationAggregateInputSchema).optional(),
  auctionCases: z.lazy(() => AuctionCaseOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => GroupOrderByRelevanceInputSchema).optional()
}).strict();

export const GroupWhereUniqueInputSchema: z.ZodType<Prisma.GroupWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => GroupWhereInputSchema),z.lazy(() => GroupWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GroupWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GroupWhereInputSchema),z.lazy(() => GroupWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  hostId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isPrivate: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  maxMembers: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  archivedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  members: z.lazy(() => UsersOnGroupsListRelationFilterSchema).optional(),
  auctionCases: z.lazy(() => AuctionCaseListRelationFilterSchema).optional()
}).strict());

export const GroupOrderByWithAggregationInputSchema: z.ZodType<Prisma.GroupOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  maxMembers: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  archivedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => GroupCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => GroupAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GroupMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GroupMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => GroupSumOrderByAggregateInputSchema).optional()
}).strict();

export const GroupScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GroupScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GroupScalarWhereWithAggregatesInputSchema),z.lazy(() => GroupScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GroupScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GroupScalarWhereWithAggregatesInputSchema),z.lazy(() => GroupScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  hostId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isPrivate: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  maxMembers: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  archivedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const UsersOnGroupsWhereInputSchema: z.ZodType<Prisma.UsersOnGroupsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UsersOnGroupsWhereInputSchema),z.lazy(() => UsersOnGroupsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersOnGroupsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersOnGroupsWhereInputSchema),z.lazy(() => UsersOnGroupsWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  groupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  invitedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  joinedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  group: z.union([ z.lazy(() => GroupRelationFilterSchema),z.lazy(() => GroupWhereInputSchema) ]).optional(),
}).strict();

export const UsersOnGroupsOrderByWithRelationInputSchema: z.ZodType<Prisma.UsersOnGroupsOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional(),
  joinedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  group: z.lazy(() => GroupOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => UsersOnGroupsOrderByRelevanceInputSchema).optional()
}).strict();

export const UsersOnGroupsWhereUniqueInputSchema: z.ZodType<Prisma.UsersOnGroupsWhereUniqueInput> = z.object({
  userId_groupId: z.lazy(() => UsersOnGroupsUserIdGroupIdCompoundUniqueInputSchema)
})
.and(z.object({
  userId_groupId: z.lazy(() => UsersOnGroupsUserIdGroupIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => UsersOnGroupsWhereInputSchema),z.lazy(() => UsersOnGroupsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersOnGroupsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersOnGroupsWhereInputSchema),z.lazy(() => UsersOnGroupsWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  groupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  invitedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  joinedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  group: z.union([ z.lazy(() => GroupRelationFilterSchema),z.lazy(() => GroupWhereInputSchema) ]).optional(),
}).strict());

export const UsersOnGroupsOrderByWithAggregationInputSchema: z.ZodType<Prisma.UsersOnGroupsOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional(),
  joinedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UsersOnGroupsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UsersOnGroupsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UsersOnGroupsMinOrderByAggregateInputSchema).optional()
}).strict();

export const UsersOnGroupsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UsersOnGroupsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UsersOnGroupsScalarWhereWithAggregatesInputSchema),z.lazy(() => UsersOnGroupsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersOnGroupsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersOnGroupsScalarWhereWithAggregatesInputSchema),z.lazy(() => UsersOnGroupsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  groupId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  invitedBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  joinedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AuctionCaseWhereInputSchema: z.ZodType<Prisma.AuctionCaseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AuctionCaseWhereInputSchema),z.lazy(() => AuctionCaseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuctionCaseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuctionCaseWhereInputSchema),z.lazy(() => AuctionCaseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  groupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  caseName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  addressDetail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bidStartsAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  bidEndsAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  actualBidStartsAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  appraisedValue: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  startingBid: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  officialValue: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  area: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  floorLevel: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  floorPlan: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  hasElevator: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  completedYear: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  group: z.union([ z.lazy(() => GroupRelationFilterSchema),z.lazy(() => GroupWhereInputSchema) ]).optional(),
  bids: z.lazy(() => BidListRelationFilterSchema).optional(),
  articles: z.lazy(() => ArticleListRelationFilterSchema).optional()
}).strict();

export const AuctionCaseOrderByWithRelationInputSchema: z.ZodType<Prisma.AuctionCaseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  caseName: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  addressDetail: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  bidEndsAt: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  actualBidStartsAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  appraisedValue: z.lazy(() => SortOrderSchema).optional(),
  startingBid: z.lazy(() => SortOrderSchema).optional(),
  officialValue: z.lazy(() => SortOrderSchema).optional(),
  area: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  floorLevel: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  floorPlan: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hasElevator: z.lazy(() => SortOrderSchema).optional(),
  completedYear: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  group: z.lazy(() => GroupOrderByWithRelationInputSchema).optional(),
  bids: z.lazy(() => BidOrderByRelationAggregateInputSchema).optional(),
  articles: z.lazy(() => ArticleOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => AuctionCaseOrderByRelevanceInputSchema).optional()
}).strict();

export const AuctionCaseWhereUniqueInputSchema: z.ZodType<Prisma.AuctionCaseWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => AuctionCaseWhereInputSchema),z.lazy(() => AuctionCaseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuctionCaseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuctionCaseWhereInputSchema),z.lazy(() => AuctionCaseWhereInputSchema).array() ]).optional(),
  groupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  caseName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  addressDetail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bidStartsAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  bidEndsAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  actualBidStartsAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  appraisedValue: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  startingBid: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  officialValue: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  area: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  floorLevel: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  floorPlan: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  hasElevator: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  completedYear: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  group: z.union([ z.lazy(() => GroupRelationFilterSchema),z.lazy(() => GroupWhereInputSchema) ]).optional(),
  bids: z.lazy(() => BidListRelationFilterSchema).optional(),
  articles: z.lazy(() => ArticleListRelationFilterSchema).optional()
}).strict());

export const AuctionCaseOrderByWithAggregationInputSchema: z.ZodType<Prisma.AuctionCaseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  caseName: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  addressDetail: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  bidEndsAt: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  actualBidStartsAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  appraisedValue: z.lazy(() => SortOrderSchema).optional(),
  startingBid: z.lazy(() => SortOrderSchema).optional(),
  officialValue: z.lazy(() => SortOrderSchema).optional(),
  area: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  floorLevel: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  floorPlan: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hasElevator: z.lazy(() => SortOrderSchema).optional(),
  completedYear: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AuctionCaseCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AuctionCaseAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AuctionCaseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AuctionCaseMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AuctionCaseSumOrderByAggregateInputSchema).optional()
}).strict();

export const AuctionCaseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AuctionCaseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AuctionCaseScalarWhereWithAggregatesInputSchema),z.lazy(() => AuctionCaseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuctionCaseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuctionCaseScalarWhereWithAggregatesInputSchema),z.lazy(() => AuctionCaseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  groupId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  caseName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  addressDetail: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  bidStartsAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  bidEndsAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  actualBidStartsAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  appraisedValue: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  startingBid: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  officialValue: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  area: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  floorLevel: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  floorPlan: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  hasElevator: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  completedYear: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const BidWhereInputSchema: z.ZodType<Prisma.BidWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BidWhereInputSchema),z.lazy(() => BidWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BidWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BidWhereInputSchema),z.lazy(() => BidWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  auctionCaseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expectedSalePrice: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  acquisitionCost: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  evacuationCost: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  repairCost: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  brokerageFee: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  estimatedInterest: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  otherCost: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  expectedProfit: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  biddingPrice: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  isExcluded: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  excludedReason: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  auctionCase: z.union([ z.lazy(() => AuctionCaseRelationFilterSchema),z.lazy(() => AuctionCaseWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const BidOrderByWithRelationInputSchema: z.ZodType<Prisma.BidOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  auctionCaseId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expectedSalePrice: z.lazy(() => SortOrderSchema).optional(),
  acquisitionCost: z.lazy(() => SortOrderSchema).optional(),
  evacuationCost: z.lazy(() => SortOrderSchema).optional(),
  repairCost: z.lazy(() => SortOrderSchema).optional(),
  brokerageFee: z.lazy(() => SortOrderSchema).optional(),
  estimatedInterest: z.lazy(() => SortOrderSchema).optional(),
  otherCost: z.lazy(() => SortOrderSchema).optional(),
  expectedProfit: z.lazy(() => SortOrderSchema).optional(),
  biddingPrice: z.lazy(() => SortOrderSchema).optional(),
  isExcluded: z.lazy(() => SortOrderSchema).optional(),
  excludedReason: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  auctionCase: z.lazy(() => AuctionCaseOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => BidOrderByRelevanceInputSchema).optional()
}).strict();

export const BidWhereUniqueInputSchema: z.ZodType<Prisma.BidWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => BidWhereInputSchema),z.lazy(() => BidWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BidWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BidWhereInputSchema),z.lazy(() => BidWhereInputSchema).array() ]).optional(),
  auctionCaseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expectedSalePrice: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  acquisitionCost: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  evacuationCost: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  repairCost: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  brokerageFee: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  estimatedInterest: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  otherCost: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  expectedProfit: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  biddingPrice: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  isExcluded: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  excludedReason: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  auctionCase: z.union([ z.lazy(() => AuctionCaseRelationFilterSchema),z.lazy(() => AuctionCaseWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const BidOrderByWithAggregationInputSchema: z.ZodType<Prisma.BidOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  auctionCaseId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expectedSalePrice: z.lazy(() => SortOrderSchema).optional(),
  acquisitionCost: z.lazy(() => SortOrderSchema).optional(),
  evacuationCost: z.lazy(() => SortOrderSchema).optional(),
  repairCost: z.lazy(() => SortOrderSchema).optional(),
  brokerageFee: z.lazy(() => SortOrderSchema).optional(),
  estimatedInterest: z.lazy(() => SortOrderSchema).optional(),
  otherCost: z.lazy(() => SortOrderSchema).optional(),
  expectedProfit: z.lazy(() => SortOrderSchema).optional(),
  biddingPrice: z.lazy(() => SortOrderSchema).optional(),
  isExcluded: z.lazy(() => SortOrderSchema).optional(),
  excludedReason: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BidCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BidAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BidMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BidMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BidSumOrderByAggregateInputSchema).optional()
}).strict();

export const BidScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BidScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BidScalarWhereWithAggregatesInputSchema),z.lazy(() => BidScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BidScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BidScalarWhereWithAggregatesInputSchema),z.lazy(() => BidScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  auctionCaseId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expectedSalePrice: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  acquisitionCost: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  evacuationCost: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  repairCost: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  brokerageFee: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  estimatedInterest: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  otherCost: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  expectedProfit: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  biddingPrice: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  isExcluded: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  excludedReason: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ArticleWhereInputSchema: z.ZodType<Prisma.ArticleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ArticleWhereInputSchema),z.lazy(() => ArticleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArticleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArticleWhereInputSchema),z.lazy(() => ArticleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  auctionCaseId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contentHtml: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isPublished: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  auctionCase: z.union([ z.lazy(() => AuctionCaseNullableRelationFilterSchema),z.lazy(() => AuctionCaseWhereInputSchema) ]).optional().nullable(),
  attachments: z.lazy(() => AttachmentListRelationFilterSchema).optional(),
  likes: z.lazy(() => LikeOnArticleListRelationFilterSchema).optional()
}).strict();

export const ArticleOrderByWithRelationInputSchema: z.ZodType<Prisma.ArticleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  auctionCaseId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  contentHtml: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  auctionCase: z.lazy(() => AuctionCaseOrderByWithRelationInputSchema).optional(),
  attachments: z.lazy(() => AttachmentOrderByRelationAggregateInputSchema).optional(),
  likes: z.lazy(() => LikeOnArticleOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => ArticleOrderByRelevanceInputSchema).optional()
}).strict();

export const ArticleWhereUniqueInputSchema: z.ZodType<Prisma.ArticleWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ArticleWhereInputSchema),z.lazy(() => ArticleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArticleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArticleWhereInputSchema),z.lazy(() => ArticleWhereInputSchema).array() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  auctionCaseId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contentHtml: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isPublished: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  auctionCase: z.union([ z.lazy(() => AuctionCaseNullableRelationFilterSchema),z.lazy(() => AuctionCaseWhereInputSchema) ]).optional().nullable(),
  attachments: z.lazy(() => AttachmentListRelationFilterSchema).optional(),
  likes: z.lazy(() => LikeOnArticleListRelationFilterSchema).optional()
}).strict());

export const ArticleOrderByWithAggregationInputSchema: z.ZodType<Prisma.ArticleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  auctionCaseId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  contentHtml: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ArticleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ArticleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ArticleMinOrderByAggregateInputSchema).optional()
}).strict();

export const ArticleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ArticleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema),z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema),z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  auctionCaseId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  contentHtml: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isPublished: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const LikeOnArticleWhereInputSchema: z.ZodType<Prisma.LikeOnArticleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LikeOnArticleWhereInputSchema),z.lazy(() => LikeOnArticleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikeOnArticleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikeOnArticleWhereInputSchema),z.lazy(() => LikeOnArticleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  articleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  article: z.union([ z.lazy(() => ArticleNullableRelationFilterSchema),z.lazy(() => ArticleWhereInputSchema) ]).optional().nullable(),
}).strict();

export const LikeOnArticleOrderByWithRelationInputSchema: z.ZodType<Prisma.LikeOnArticleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  article: z.lazy(() => ArticleOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => LikeOnArticleOrderByRelevanceInputSchema).optional()
}).strict();

export const LikeOnArticleWhereUniqueInputSchema: z.ZodType<Prisma.LikeOnArticleWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => LikeOnArticleWhereInputSchema),z.lazy(() => LikeOnArticleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikeOnArticleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikeOnArticleWhereInputSchema),z.lazy(() => LikeOnArticleWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  articleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  article: z.union([ z.lazy(() => ArticleNullableRelationFilterSchema),z.lazy(() => ArticleWhereInputSchema) ]).optional().nullable(),
}).strict());

export const LikeOnArticleOrderByWithAggregationInputSchema: z.ZodType<Prisma.LikeOnArticleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LikeOnArticleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LikeOnArticleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LikeOnArticleMinOrderByAggregateInputSchema).optional()
}).strict();

export const LikeOnArticleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LikeOnArticleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LikeOnArticleScalarWhereWithAggregatesInputSchema),z.lazy(() => LikeOnArticleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikeOnArticleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikeOnArticleScalarWhereWithAggregatesInputSchema),z.lazy(() => LikeOnArticleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  articleId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AttachmentWhereInputSchema: z.ZodType<Prisma.AttachmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AttachmentWhereInputSchema),z.lazy(() => AttachmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AttachmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AttachmentWhereInputSchema),z.lazy(() => AttachmentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  articleId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fileName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  article: z.union([ z.lazy(() => ArticleNullableRelationFilterSchema),z.lazy(() => ArticleWhereInputSchema) ]).optional().nullable(),
}).strict();

export const AttachmentOrderByWithRelationInputSchema: z.ZodType<Prisma.AttachmentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fileName: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  article: z.lazy(() => ArticleOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => AttachmentOrderByRelevanceInputSchema).optional()
}).strict();

export const AttachmentWhereUniqueInputSchema: z.ZodType<Prisma.AttachmentWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => AttachmentWhereInputSchema),z.lazy(() => AttachmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AttachmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AttachmentWhereInputSchema),z.lazy(() => AttachmentWhereInputSchema).array() ]).optional(),
  articleId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fileName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  article: z.union([ z.lazy(() => ArticleNullableRelationFilterSchema),z.lazy(() => ArticleWhereInputSchema) ]).optional().nullable(),
}).strict());

export const AttachmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.AttachmentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fileName: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AttachmentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AttachmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AttachmentMinOrderByAggregateInputSchema).optional()
}).strict();

export const AttachmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AttachmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AttachmentScalarWhereWithAggregatesInputSchema),z.lazy(() => AttachmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AttachmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AttachmentScalarWhereWithAggregatesInputSchema),z.lazy(() => AttachmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  articleId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  fileName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
  points: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutUserInputSchema).optional(),
  bids: z.lazy(() => BidCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
  points: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mobile: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUpdateManyWithoutUserNestedInputSchema).optional(),
  bids: z.lazy(() => BidUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mobile: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
  points: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mobile: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mobile: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GroupCreateInputSchema: z.ZodType<Prisma.GroupCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  hostId: z.string(),
  isPrivate: z.boolean().optional(),
  password: z.string().optional().nullable(),
  maxMembers: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  archivedAt: z.coerce.date().optional().nullable(),
  members: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutGroupInputSchema).optional(),
  auctionCases: z.lazy(() => AuctionCaseCreateNestedManyWithoutGroupInputSchema).optional()
}).strict();

export const GroupUncheckedCreateInputSchema: z.ZodType<Prisma.GroupUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  hostId: z.string(),
  isPrivate: z.boolean().optional(),
  password: z.string().optional().nullable(),
  maxMembers: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  archivedAt: z.coerce.date().optional().nullable(),
  members: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutGroupInputSchema).optional(),
  auctionCases: z.lazy(() => AuctionCaseUncheckedCreateNestedManyWithoutGroupInputSchema).optional()
}).strict();

export const GroupUpdateInputSchema: z.ZodType<Prisma.GroupUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxMembers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  archivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  members: z.lazy(() => UsersOnGroupsUpdateManyWithoutGroupNestedInputSchema).optional(),
  auctionCases: z.lazy(() => AuctionCaseUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const GroupUncheckedUpdateInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxMembers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  archivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  members: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutGroupNestedInputSchema).optional(),
  auctionCases: z.lazy(() => AuctionCaseUncheckedUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const GroupCreateManyInputSchema: z.ZodType<Prisma.GroupCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  hostId: z.string(),
  isPrivate: z.boolean().optional(),
  password: z.string().optional().nullable(),
  maxMembers: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  archivedAt: z.coerce.date().optional().nullable()
}).strict();

export const GroupUpdateManyMutationInputSchema: z.ZodType<Prisma.GroupUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxMembers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  archivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const GroupUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxMembers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  archivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UsersOnGroupsCreateInputSchema: z.ZodType<Prisma.UsersOnGroupsCreateInput> = z.object({
  invitedBy: z.string(),
  joinedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutGroupsInputSchema),
  group: z.lazy(() => GroupCreateNestedOneWithoutMembersInputSchema)
}).strict();

export const UsersOnGroupsUncheckedCreateInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedCreateInput> = z.object({
  userId: z.string(),
  groupId: z.string(),
  invitedBy: z.string(),
  joinedAt: z.coerce.date().optional()
}).strict();

export const UsersOnGroupsUpdateInputSchema: z.ZodType<Prisma.UsersOnGroupsUpdateInput> = z.object({
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutGroupsNestedInputSchema).optional(),
  group: z.lazy(() => GroupUpdateOneRequiredWithoutMembersNestedInputSchema).optional()
}).strict();

export const UsersOnGroupsUncheckedUpdateInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersOnGroupsCreateManyInputSchema: z.ZodType<Prisma.UsersOnGroupsCreateManyInput> = z.object({
  userId: z.string(),
  groupId: z.string(),
  invitedBy: z.string(),
  joinedAt: z.coerce.date().optional()
}).strict();

export const UsersOnGroupsUpdateManyMutationInputSchema: z.ZodType<Prisma.UsersOnGroupsUpdateManyMutationInput> = z.object({
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersOnGroupsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuctionCaseCreateInputSchema: z.ZodType<Prisma.AuctionCaseCreateInput> = z.object({
  id: z.string().cuid().optional(),
  caseName: z.string(),
  address: z.string().optional().nullable(),
  addressDetail: z.string().optional().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  image: z.string().optional().nullable(),
  actualBidStartsAt: z.coerce.date().optional().nullable(),
  appraisedValue: z.number().int().optional(),
  startingBid: z.number().int().optional(),
  officialValue: z.number().int().optional(),
  area: z.number().optional().nullable(),
  floorLevel: z.number().int().optional().nullable(),
  floorPlan: z.string().optional().nullable(),
  hasElevator: z.boolean().optional(),
  completedYear: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  group: z.lazy(() => GroupCreateNestedOneWithoutAuctionCasesInputSchema),
  bids: z.lazy(() => BidCreateNestedManyWithoutAuctionCaseInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutAuctionCaseInputSchema).optional()
}).strict();

export const AuctionCaseUncheckedCreateInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  groupId: z.string(),
  caseName: z.string(),
  address: z.string().optional().nullable(),
  addressDetail: z.string().optional().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  image: z.string().optional().nullable(),
  actualBidStartsAt: z.coerce.date().optional().nullable(),
  appraisedValue: z.number().int().optional(),
  startingBid: z.number().int().optional(),
  officialValue: z.number().int().optional(),
  area: z.number().optional().nullable(),
  floorLevel: z.number().int().optional().nullable(),
  floorPlan: z.string().optional().nullable(),
  hasElevator: z.boolean().optional(),
  completedYear: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bids: z.lazy(() => BidUncheckedCreateNestedManyWithoutAuctionCaseInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutAuctionCaseInputSchema).optional()
}).strict();

export const AuctionCaseUpdateInputSchema: z.ZodType<Prisma.AuctionCaseUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  officialValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  area: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorLevel: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorPlan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasElevator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  completedYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  group: z.lazy(() => GroupUpdateOneRequiredWithoutAuctionCasesNestedInputSchema).optional(),
  bids: z.lazy(() => BidUpdateManyWithoutAuctionCaseNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutAuctionCaseNestedInputSchema).optional()
}).strict();

export const AuctionCaseUncheckedUpdateInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  officialValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  area: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorLevel: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorPlan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasElevator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  completedYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bids: z.lazy(() => BidUncheckedUpdateManyWithoutAuctionCaseNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutAuctionCaseNestedInputSchema).optional()
}).strict();

export const AuctionCaseCreateManyInputSchema: z.ZodType<Prisma.AuctionCaseCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  groupId: z.string(),
  caseName: z.string(),
  address: z.string().optional().nullable(),
  addressDetail: z.string().optional().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  image: z.string().optional().nullable(),
  actualBidStartsAt: z.coerce.date().optional().nullable(),
  appraisedValue: z.number().int().optional(),
  startingBid: z.number().int().optional(),
  officialValue: z.number().int().optional(),
  area: z.number().optional().nullable(),
  floorLevel: z.number().int().optional().nullable(),
  floorPlan: z.string().optional().nullable(),
  hasElevator: z.boolean().optional(),
  completedYear: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AuctionCaseUpdateManyMutationInputSchema: z.ZodType<Prisma.AuctionCaseUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  officialValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  area: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorLevel: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorPlan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasElevator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  completedYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuctionCaseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  officialValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  area: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorLevel: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorPlan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasElevator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  completedYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BidCreateInputSchema: z.ZodType<Prisma.BidCreateInput> = z.object({
  id: z.string().cuid().optional(),
  expectedSalePrice: z.number().int().optional(),
  acquisitionCost: z.number().int().optional(),
  evacuationCost: z.number().int().optional(),
  repairCost: z.number().int().optional(),
  brokerageFee: z.number().int().optional(),
  estimatedInterest: z.number().int().optional(),
  otherCost: z.number().int().optional(),
  expectedProfit: z.number().int().optional(),
  biddingPrice: z.number().int().optional(),
  isExcluded: z.boolean().optional(),
  excludedReason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  auctionCase: z.lazy(() => AuctionCaseCreateNestedOneWithoutBidsInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutBidsInputSchema)
}).strict();

export const BidUncheckedCreateInputSchema: z.ZodType<Prisma.BidUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  auctionCaseId: z.string(),
  userId: z.string(),
  expectedSalePrice: z.number().int().optional(),
  acquisitionCost: z.number().int().optional(),
  evacuationCost: z.number().int().optional(),
  repairCost: z.number().int().optional(),
  brokerageFee: z.number().int().optional(),
  estimatedInterest: z.number().int().optional(),
  otherCost: z.number().int().optional(),
  expectedProfit: z.number().int().optional(),
  biddingPrice: z.number().int().optional(),
  isExcluded: z.boolean().optional(),
  excludedReason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BidUpdateInputSchema: z.ZodType<Prisma.BidUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expectedSalePrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  acquisitionCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evacuationCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repairCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  brokerageFee: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedInterest: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  otherCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expectedProfit: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  biddingPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isExcluded: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  excludedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  auctionCase: z.lazy(() => AuctionCaseUpdateOneRequiredWithoutBidsNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBidsNestedInputSchema).optional()
}).strict();

export const BidUncheckedUpdateInputSchema: z.ZodType<Prisma.BidUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  auctionCaseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expectedSalePrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  acquisitionCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evacuationCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repairCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  brokerageFee: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedInterest: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  otherCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expectedProfit: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  biddingPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isExcluded: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  excludedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BidCreateManyInputSchema: z.ZodType<Prisma.BidCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  auctionCaseId: z.string(),
  userId: z.string(),
  expectedSalePrice: z.number().int().optional(),
  acquisitionCost: z.number().int().optional(),
  evacuationCost: z.number().int().optional(),
  repairCost: z.number().int().optional(),
  brokerageFee: z.number().int().optional(),
  estimatedInterest: z.number().int().optional(),
  otherCost: z.number().int().optional(),
  expectedProfit: z.number().int().optional(),
  biddingPrice: z.number().int().optional(),
  isExcluded: z.boolean().optional(),
  excludedReason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BidUpdateManyMutationInputSchema: z.ZodType<Prisma.BidUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expectedSalePrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  acquisitionCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evacuationCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repairCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  brokerageFee: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedInterest: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  otherCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expectedProfit: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  biddingPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isExcluded: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  excludedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BidUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BidUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  auctionCaseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expectedSalePrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  acquisitionCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evacuationCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repairCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  brokerageFee: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedInterest: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  otherCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expectedProfit: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  biddingPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isExcluded: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  excludedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArticleCreateInputSchema: z.ZodType<Prisma.ArticleCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string().optional().nullable(),
  contentHtml: z.string().optional().nullable(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutArticlesInputSchema),
  auctionCase: z.lazy(() => AuctionCaseCreateNestedOneWithoutArticlesInputSchema).optional(),
  attachments: z.lazy(() => AttachmentCreateNestedManyWithoutArticleInputSchema).optional(),
  likes: z.lazy(() => LikeOnArticleCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export const ArticleUncheckedCreateInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  authorId: z.string(),
  auctionCaseId: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  contentHtml: z.string().optional().nullable(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  attachments: z.lazy(() => AttachmentUncheckedCreateNestedManyWithoutArticleInputSchema).optional(),
  likes: z.lazy(() => LikeOnArticleUncheckedCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export const ArticleUpdateInputSchema: z.ZodType<Prisma.ArticleUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contentHtml: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutArticlesNestedInputSchema).optional(),
  auctionCase: z.lazy(() => AuctionCaseUpdateOneWithoutArticlesNestedInputSchema).optional(),
  attachments: z.lazy(() => AttachmentUpdateManyWithoutArticleNestedInputSchema).optional(),
  likes: z.lazy(() => LikeOnArticleUpdateManyWithoutArticleNestedInputSchema).optional()
}).strict();

export const ArticleUncheckedUpdateInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  auctionCaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contentHtml: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  attachments: z.lazy(() => AttachmentUncheckedUpdateManyWithoutArticleNestedInputSchema).optional(),
  likes: z.lazy(() => LikeOnArticleUncheckedUpdateManyWithoutArticleNestedInputSchema).optional()
}).strict();

export const ArticleCreateManyInputSchema: z.ZodType<Prisma.ArticleCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  authorId: z.string(),
  auctionCaseId: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  contentHtml: z.string().optional().nullable(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ArticleUpdateManyMutationInputSchema: z.ZodType<Prisma.ArticleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contentHtml: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArticleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  auctionCaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contentHtml: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeOnArticleCreateInputSchema: z.ZodType<Prisma.LikeOnArticleCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  article: z.lazy(() => ArticleCreateNestedOneWithoutLikesInputSchema).optional()
}).strict();

export const LikeOnArticleUncheckedCreateInputSchema: z.ZodType<Prisma.LikeOnArticleUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  articleId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LikeOnArticleUpdateInputSchema: z.ZodType<Prisma.LikeOnArticleUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  article: z.lazy(() => ArticleUpdateOneWithoutLikesNestedInputSchema).optional()
}).strict();

export const LikeOnArticleUncheckedUpdateInputSchema: z.ZodType<Prisma.LikeOnArticleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  articleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeOnArticleCreateManyInputSchema: z.ZodType<Prisma.LikeOnArticleCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  articleId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LikeOnArticleUpdateManyMutationInputSchema: z.ZodType<Prisma.LikeOnArticleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeOnArticleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LikeOnArticleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  articleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AttachmentCreateInputSchema: z.ZodType<Prisma.AttachmentCreateInput> = z.object({
  id: z.string().cuid().optional(),
  fileName: z.string(),
  url: z.string(),
  article: z.lazy(() => ArticleCreateNestedOneWithoutAttachmentsInputSchema).optional()
}).strict();

export const AttachmentUncheckedCreateInputSchema: z.ZodType<Prisma.AttachmentUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  articleId: z.string().optional().nullable(),
  fileName: z.string(),
  url: z.string()
}).strict();

export const AttachmentUpdateInputSchema: z.ZodType<Prisma.AttachmentUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  article: z.lazy(() => ArticleUpdateOneWithoutAttachmentsNestedInputSchema).optional()
}).strict();

export const AttachmentUncheckedUpdateInputSchema: z.ZodType<Prisma.AttachmentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  articleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fileName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AttachmentCreateManyInputSchema: z.ZodType<Prisma.AttachmentCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  articleId: z.string().optional().nullable(),
  fileName: z.string(),
  url: z.string()
}).strict();

export const AttachmentUpdateManyMutationInputSchema: z.ZodType<Prisma.AttachmentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AttachmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AttachmentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  articleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fileName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const UsersOnGroupsListRelationFilterSchema: z.ZodType<Prisma.UsersOnGroupsListRelationFilter> = z.object({
  every: z.lazy(() => UsersOnGroupsWhereInputSchema).optional(),
  some: z.lazy(() => UsersOnGroupsWhereInputSchema).optional(),
  none: z.lazy(() => UsersOnGroupsWhereInputSchema).optional()
}).strict();

export const BidListRelationFilterSchema: z.ZodType<Prisma.BidListRelationFilter> = z.object({
  every: z.lazy(() => BidWhereInputSchema).optional(),
  some: z.lazy(() => BidWhereInputSchema).optional(),
  none: z.lazy(() => BidWhereInputSchema).optional()
}).strict();

export const ArticleListRelationFilterSchema: z.ZodType<Prisma.ArticleListRelationFilter> = z.object({
  every: z.lazy(() => ArticleWhereInputSchema).optional(),
  some: z.lazy(() => ArticleWhereInputSchema).optional(),
  none: z.lazy(() => ArticleWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersOnGroupsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UsersOnGroupsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BidOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BidOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArticleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ArticleOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserOrderByRelevanceInputSchema: z.ZodType<Prisma.UserOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => UserOrderByRelevanceFieldEnumSchema),z.lazy(() => UserOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  mobile: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  points: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  mobile: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  mobile: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  points: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const AccountOrderByRelevanceInputSchema: z.ZodType<Prisma.AccountOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => AccountOrderByRelevanceFieldEnumSchema),z.lazy(() => AccountOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const SessionOrderByRelevanceInputSchema: z.ZodType<Prisma.SessionOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => SessionOrderByRelevanceFieldEnumSchema),z.lazy(() => SessionOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const AuctionCaseListRelationFilterSchema: z.ZodType<Prisma.AuctionCaseListRelationFilter> = z.object({
  every: z.lazy(() => AuctionCaseWhereInputSchema).optional(),
  some: z.lazy(() => AuctionCaseWhereInputSchema).optional(),
  none: z.lazy(() => AuctionCaseWhereInputSchema).optional()
}).strict();

export const AuctionCaseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AuctionCaseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GroupOrderByRelevanceInputSchema: z.ZodType<Prisma.GroupOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => GroupOrderByRelevanceFieldEnumSchema),z.lazy(() => GroupOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const GroupCountOrderByAggregateInputSchema: z.ZodType<Prisma.GroupCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  maxMembers: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  archivedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GroupAvgOrderByAggregateInputSchema: z.ZodType<Prisma.GroupAvgOrderByAggregateInput> = z.object({
  maxMembers: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GroupMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GroupMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  maxMembers: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  archivedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GroupMinOrderByAggregateInputSchema: z.ZodType<Prisma.GroupMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  maxMembers: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  archivedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GroupSumOrderByAggregateInputSchema: z.ZodType<Prisma.GroupSumOrderByAggregateInput> = z.object({
  maxMembers: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const GroupRelationFilterSchema: z.ZodType<Prisma.GroupRelationFilter> = z.object({
  is: z.lazy(() => GroupWhereInputSchema).optional(),
  isNot: z.lazy(() => GroupWhereInputSchema).optional()
}).strict();

export const UsersOnGroupsOrderByRelevanceInputSchema: z.ZodType<Prisma.UsersOnGroupsOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => UsersOnGroupsOrderByRelevanceFieldEnumSchema),z.lazy(() => UsersOnGroupsOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const UsersOnGroupsUserIdGroupIdCompoundUniqueInputSchema: z.ZodType<Prisma.UsersOnGroupsUserIdGroupIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  groupId: z.string()
}).strict();

export const UsersOnGroupsCountOrderByAggregateInputSchema: z.ZodType<Prisma.UsersOnGroupsCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional(),
  joinedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersOnGroupsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UsersOnGroupsMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional(),
  joinedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersOnGroupsMinOrderByAggregateInputSchema: z.ZodType<Prisma.UsersOnGroupsMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional(),
  joinedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AuctionCaseOrderByRelevanceInputSchema: z.ZodType<Prisma.AuctionCaseOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => AuctionCaseOrderByRelevanceFieldEnumSchema),z.lazy(() => AuctionCaseOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const AuctionCaseCountOrderByAggregateInputSchema: z.ZodType<Prisma.AuctionCaseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  caseName: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  addressDetail: z.lazy(() => SortOrderSchema).optional(),
  bidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  bidEndsAt: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  actualBidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  appraisedValue: z.lazy(() => SortOrderSchema).optional(),
  startingBid: z.lazy(() => SortOrderSchema).optional(),
  officialValue: z.lazy(() => SortOrderSchema).optional(),
  area: z.lazy(() => SortOrderSchema).optional(),
  floorLevel: z.lazy(() => SortOrderSchema).optional(),
  floorPlan: z.lazy(() => SortOrderSchema).optional(),
  hasElevator: z.lazy(() => SortOrderSchema).optional(),
  completedYear: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuctionCaseAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AuctionCaseAvgOrderByAggregateInput> = z.object({
  appraisedValue: z.lazy(() => SortOrderSchema).optional(),
  startingBid: z.lazy(() => SortOrderSchema).optional(),
  officialValue: z.lazy(() => SortOrderSchema).optional(),
  area: z.lazy(() => SortOrderSchema).optional(),
  floorLevel: z.lazy(() => SortOrderSchema).optional(),
  completedYear: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuctionCaseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AuctionCaseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  caseName: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  addressDetail: z.lazy(() => SortOrderSchema).optional(),
  bidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  bidEndsAt: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  actualBidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  appraisedValue: z.lazy(() => SortOrderSchema).optional(),
  startingBid: z.lazy(() => SortOrderSchema).optional(),
  officialValue: z.lazy(() => SortOrderSchema).optional(),
  area: z.lazy(() => SortOrderSchema).optional(),
  floorLevel: z.lazy(() => SortOrderSchema).optional(),
  floorPlan: z.lazy(() => SortOrderSchema).optional(),
  hasElevator: z.lazy(() => SortOrderSchema).optional(),
  completedYear: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuctionCaseMinOrderByAggregateInputSchema: z.ZodType<Prisma.AuctionCaseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  caseName: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  addressDetail: z.lazy(() => SortOrderSchema).optional(),
  bidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  bidEndsAt: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  actualBidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  appraisedValue: z.lazy(() => SortOrderSchema).optional(),
  startingBid: z.lazy(() => SortOrderSchema).optional(),
  officialValue: z.lazy(() => SortOrderSchema).optional(),
  area: z.lazy(() => SortOrderSchema).optional(),
  floorLevel: z.lazy(() => SortOrderSchema).optional(),
  floorPlan: z.lazy(() => SortOrderSchema).optional(),
  hasElevator: z.lazy(() => SortOrderSchema).optional(),
  completedYear: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuctionCaseSumOrderByAggregateInputSchema: z.ZodType<Prisma.AuctionCaseSumOrderByAggregateInput> = z.object({
  appraisedValue: z.lazy(() => SortOrderSchema).optional(),
  startingBid: z.lazy(() => SortOrderSchema).optional(),
  officialValue: z.lazy(() => SortOrderSchema).optional(),
  area: z.lazy(() => SortOrderSchema).optional(),
  floorLevel: z.lazy(() => SortOrderSchema).optional(),
  completedYear: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const AuctionCaseRelationFilterSchema: z.ZodType<Prisma.AuctionCaseRelationFilter> = z.object({
  is: z.lazy(() => AuctionCaseWhereInputSchema).optional(),
  isNot: z.lazy(() => AuctionCaseWhereInputSchema).optional()
}).strict();

export const BidOrderByRelevanceInputSchema: z.ZodType<Prisma.BidOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => BidOrderByRelevanceFieldEnumSchema),z.lazy(() => BidOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const BidCountOrderByAggregateInputSchema: z.ZodType<Prisma.BidCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  auctionCaseId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expectedSalePrice: z.lazy(() => SortOrderSchema).optional(),
  acquisitionCost: z.lazy(() => SortOrderSchema).optional(),
  evacuationCost: z.lazy(() => SortOrderSchema).optional(),
  repairCost: z.lazy(() => SortOrderSchema).optional(),
  brokerageFee: z.lazy(() => SortOrderSchema).optional(),
  estimatedInterest: z.lazy(() => SortOrderSchema).optional(),
  otherCost: z.lazy(() => SortOrderSchema).optional(),
  expectedProfit: z.lazy(() => SortOrderSchema).optional(),
  biddingPrice: z.lazy(() => SortOrderSchema).optional(),
  isExcluded: z.lazy(() => SortOrderSchema).optional(),
  excludedReason: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BidAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BidAvgOrderByAggregateInput> = z.object({
  expectedSalePrice: z.lazy(() => SortOrderSchema).optional(),
  acquisitionCost: z.lazy(() => SortOrderSchema).optional(),
  evacuationCost: z.lazy(() => SortOrderSchema).optional(),
  repairCost: z.lazy(() => SortOrderSchema).optional(),
  brokerageFee: z.lazy(() => SortOrderSchema).optional(),
  estimatedInterest: z.lazy(() => SortOrderSchema).optional(),
  otherCost: z.lazy(() => SortOrderSchema).optional(),
  expectedProfit: z.lazy(() => SortOrderSchema).optional(),
  biddingPrice: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BidMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BidMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  auctionCaseId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expectedSalePrice: z.lazy(() => SortOrderSchema).optional(),
  acquisitionCost: z.lazy(() => SortOrderSchema).optional(),
  evacuationCost: z.lazy(() => SortOrderSchema).optional(),
  repairCost: z.lazy(() => SortOrderSchema).optional(),
  brokerageFee: z.lazy(() => SortOrderSchema).optional(),
  estimatedInterest: z.lazy(() => SortOrderSchema).optional(),
  otherCost: z.lazy(() => SortOrderSchema).optional(),
  expectedProfit: z.lazy(() => SortOrderSchema).optional(),
  biddingPrice: z.lazy(() => SortOrderSchema).optional(),
  isExcluded: z.lazy(() => SortOrderSchema).optional(),
  excludedReason: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BidMinOrderByAggregateInputSchema: z.ZodType<Prisma.BidMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  auctionCaseId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expectedSalePrice: z.lazy(() => SortOrderSchema).optional(),
  acquisitionCost: z.lazy(() => SortOrderSchema).optional(),
  evacuationCost: z.lazy(() => SortOrderSchema).optional(),
  repairCost: z.lazy(() => SortOrderSchema).optional(),
  brokerageFee: z.lazy(() => SortOrderSchema).optional(),
  estimatedInterest: z.lazy(() => SortOrderSchema).optional(),
  otherCost: z.lazy(() => SortOrderSchema).optional(),
  expectedProfit: z.lazy(() => SortOrderSchema).optional(),
  biddingPrice: z.lazy(() => SortOrderSchema).optional(),
  isExcluded: z.lazy(() => SortOrderSchema).optional(),
  excludedReason: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BidSumOrderByAggregateInputSchema: z.ZodType<Prisma.BidSumOrderByAggregateInput> = z.object({
  expectedSalePrice: z.lazy(() => SortOrderSchema).optional(),
  acquisitionCost: z.lazy(() => SortOrderSchema).optional(),
  evacuationCost: z.lazy(() => SortOrderSchema).optional(),
  repairCost: z.lazy(() => SortOrderSchema).optional(),
  brokerageFee: z.lazy(() => SortOrderSchema).optional(),
  estimatedInterest: z.lazy(() => SortOrderSchema).optional(),
  otherCost: z.lazy(() => SortOrderSchema).optional(),
  expectedProfit: z.lazy(() => SortOrderSchema).optional(),
  biddingPrice: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuctionCaseNullableRelationFilterSchema: z.ZodType<Prisma.AuctionCaseNullableRelationFilter> = z.object({
  is: z.lazy(() => AuctionCaseWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AuctionCaseWhereInputSchema).optional().nullable()
}).strict();

export const AttachmentListRelationFilterSchema: z.ZodType<Prisma.AttachmentListRelationFilter> = z.object({
  every: z.lazy(() => AttachmentWhereInputSchema).optional(),
  some: z.lazy(() => AttachmentWhereInputSchema).optional(),
  none: z.lazy(() => AttachmentWhereInputSchema).optional()
}).strict();

export const LikeOnArticleListRelationFilterSchema: z.ZodType<Prisma.LikeOnArticleListRelationFilter> = z.object({
  every: z.lazy(() => LikeOnArticleWhereInputSchema).optional(),
  some: z.lazy(() => LikeOnArticleWhereInputSchema).optional(),
  none: z.lazy(() => LikeOnArticleWhereInputSchema).optional()
}).strict();

export const AttachmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AttachmentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LikeOnArticleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LikeOnArticleOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArticleOrderByRelevanceInputSchema: z.ZodType<Prisma.ArticleOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => ArticleOrderByRelevanceFieldEnumSchema),z.lazy(() => ArticleOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const ArticleCountOrderByAggregateInputSchema: z.ZodType<Prisma.ArticleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  auctionCaseId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  contentHtml: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArticleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ArticleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  auctionCaseId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  contentHtml: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArticleMinOrderByAggregateInputSchema: z.ZodType<Prisma.ArticleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  auctionCaseId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  contentHtml: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArticleNullableRelationFilterSchema: z.ZodType<Prisma.ArticleNullableRelationFilter> = z.object({
  is: z.lazy(() => ArticleWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ArticleWhereInputSchema).optional().nullable()
}).strict();

export const LikeOnArticleOrderByRelevanceInputSchema: z.ZodType<Prisma.LikeOnArticleOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => LikeOnArticleOrderByRelevanceFieldEnumSchema),z.lazy(() => LikeOnArticleOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const LikeOnArticleCountOrderByAggregateInputSchema: z.ZodType<Prisma.LikeOnArticleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LikeOnArticleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LikeOnArticleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LikeOnArticleMinOrderByAggregateInputSchema: z.ZodType<Prisma.LikeOnArticleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AttachmentOrderByRelevanceInputSchema: z.ZodType<Prisma.AttachmentOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => AttachmentOrderByRelevanceFieldEnumSchema),z.lazy(() => AttachmentOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const AttachmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.AttachmentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.lazy(() => SortOrderSchema).optional(),
  fileName: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AttachmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AttachmentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.lazy(() => SortOrderSchema).optional(),
  fileName: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AttachmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.AttachmentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.lazy(() => SortOrderSchema).optional(),
  fileName: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsersOnGroupsCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UsersOnGroupsCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UsersOnGroupsCreateWithoutUserInputSchema),z.lazy(() => UsersOnGroupsCreateWithoutUserInputSchema).array(),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersOnGroupsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsersOnGroupsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersOnGroupsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BidCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BidCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BidCreateWithoutUserInputSchema),z.lazy(() => BidCreateWithoutUserInputSchema).array(),z.lazy(() => BidUncheckedCreateWithoutUserInputSchema),z.lazy(() => BidUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BidCreateOrConnectWithoutUserInputSchema),z.lazy(() => BidCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BidCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ArticleCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuthorInputSchema),z.lazy(() => ArticleCreateWithoutAuthorInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsersOnGroupsUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UsersOnGroupsCreateWithoutUserInputSchema),z.lazy(() => UsersOnGroupsCreateWithoutUserInputSchema).array(),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersOnGroupsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsersOnGroupsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersOnGroupsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BidUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BidUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BidCreateWithoutUserInputSchema),z.lazy(() => BidCreateWithoutUserInputSchema).array(),z.lazy(() => BidUncheckedCreateWithoutUserInputSchema),z.lazy(() => BidUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BidCreateOrConnectWithoutUserInputSchema),z.lazy(() => BidCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BidCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuthorInputSchema),z.lazy(() => ArticleCreateWithoutAuthorInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UsersOnGroupsUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UsersOnGroupsUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersOnGroupsCreateWithoutUserInputSchema),z.lazy(() => UsersOnGroupsCreateWithoutUserInputSchema).array(),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersOnGroupsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsersOnGroupsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsersOnGroupsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsersOnGroupsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersOnGroupsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsersOnGroupsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsersOnGroupsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsersOnGroupsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UsersOnGroupsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsersOnGroupsScalarWhereInputSchema),z.lazy(() => UsersOnGroupsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BidUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.BidUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => BidCreateWithoutUserInputSchema),z.lazy(() => BidCreateWithoutUserInputSchema).array(),z.lazy(() => BidUncheckedCreateWithoutUserInputSchema),z.lazy(() => BidUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BidCreateOrConnectWithoutUserInputSchema),z.lazy(() => BidCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BidUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BidUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BidCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BidUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BidUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BidUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => BidUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BidScalarWhereInputSchema),z.lazy(() => BidScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ArticleUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.ArticleUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuthorInputSchema),z.lazy(() => ArticleCreateWithoutAuthorInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ArticleUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => ArticleUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ArticleUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => ArticleUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ArticleUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => ArticleUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ArticleScalarWhereInputSchema),z.lazy(() => ArticleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UsersOnGroupsUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersOnGroupsCreateWithoutUserInputSchema),z.lazy(() => UsersOnGroupsCreateWithoutUserInputSchema).array(),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersOnGroupsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsersOnGroupsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsersOnGroupsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsersOnGroupsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersOnGroupsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsersOnGroupsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsersOnGroupsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsersOnGroupsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UsersOnGroupsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsersOnGroupsScalarWhereInputSchema),z.lazy(() => UsersOnGroupsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BidUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.BidUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => BidCreateWithoutUserInputSchema),z.lazy(() => BidCreateWithoutUserInputSchema).array(),z.lazy(() => BidUncheckedCreateWithoutUserInputSchema),z.lazy(() => BidUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BidCreateOrConnectWithoutUserInputSchema),z.lazy(() => BidCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BidUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BidUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BidCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BidUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BidUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BidUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => BidUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BidScalarWhereInputSchema),z.lazy(() => BidScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ArticleUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuthorInputSchema),z.lazy(() => ArticleCreateWithoutAuthorInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ArticleUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => ArticleUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ArticleUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => ArticleUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ArticleUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => ArticleUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ArticleScalarWhereInputSchema),z.lazy(() => ArticleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountInputSchema),z.lazy(() => UserUpdateWithoutAccountInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionInputSchema),z.lazy(() => UserUpdateWithoutSessionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionInputSchema) ]).optional(),
}).strict();

export const UsersOnGroupsCreateNestedManyWithoutGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsCreateNestedManyWithoutGroupInput> = z.object({
  create: z.union([ z.lazy(() => UsersOnGroupsCreateWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsCreateWithoutGroupInputSchema).array(),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersOnGroupsCreateOrConnectWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersOnGroupsCreateManyGroupInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AuctionCaseCreateNestedManyWithoutGroupInputSchema: z.ZodType<Prisma.AuctionCaseCreateNestedManyWithoutGroupInput> = z.object({
  create: z.union([ z.lazy(() => AuctionCaseCreateWithoutGroupInputSchema),z.lazy(() => AuctionCaseCreateWithoutGroupInputSchema).array(),z.lazy(() => AuctionCaseUncheckedCreateWithoutGroupInputSchema),z.lazy(() => AuctionCaseUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuctionCaseCreateOrConnectWithoutGroupInputSchema),z.lazy(() => AuctionCaseCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuctionCaseCreateManyGroupInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AuctionCaseWhereUniqueInputSchema),z.lazy(() => AuctionCaseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsersOnGroupsUncheckedCreateNestedManyWithoutGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedCreateNestedManyWithoutGroupInput> = z.object({
  create: z.union([ z.lazy(() => UsersOnGroupsCreateWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsCreateWithoutGroupInputSchema).array(),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersOnGroupsCreateOrConnectWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersOnGroupsCreateManyGroupInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AuctionCaseUncheckedCreateNestedManyWithoutGroupInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedCreateNestedManyWithoutGroupInput> = z.object({
  create: z.union([ z.lazy(() => AuctionCaseCreateWithoutGroupInputSchema),z.lazy(() => AuctionCaseCreateWithoutGroupInputSchema).array(),z.lazy(() => AuctionCaseUncheckedCreateWithoutGroupInputSchema),z.lazy(() => AuctionCaseUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuctionCaseCreateOrConnectWithoutGroupInputSchema),z.lazy(() => AuctionCaseCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuctionCaseCreateManyGroupInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AuctionCaseWhereUniqueInputSchema),z.lazy(() => AuctionCaseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UsersOnGroupsUpdateManyWithoutGroupNestedInputSchema: z.ZodType<Prisma.UsersOnGroupsUpdateManyWithoutGroupNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersOnGroupsCreateWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsCreateWithoutGroupInputSchema).array(),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersOnGroupsCreateOrConnectWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsersOnGroupsUpsertWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsUpsertWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersOnGroupsCreateManyGroupInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsersOnGroupsUpdateWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsUpdateWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsersOnGroupsUpdateManyWithWhereWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsUpdateManyWithWhereWithoutGroupInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsersOnGroupsScalarWhereInputSchema),z.lazy(() => UsersOnGroupsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AuctionCaseUpdateManyWithoutGroupNestedInputSchema: z.ZodType<Prisma.AuctionCaseUpdateManyWithoutGroupNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuctionCaseCreateWithoutGroupInputSchema),z.lazy(() => AuctionCaseCreateWithoutGroupInputSchema).array(),z.lazy(() => AuctionCaseUncheckedCreateWithoutGroupInputSchema),z.lazy(() => AuctionCaseUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuctionCaseCreateOrConnectWithoutGroupInputSchema),z.lazy(() => AuctionCaseCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AuctionCaseUpsertWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => AuctionCaseUpsertWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuctionCaseCreateManyGroupInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AuctionCaseWhereUniqueInputSchema),z.lazy(() => AuctionCaseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AuctionCaseWhereUniqueInputSchema),z.lazy(() => AuctionCaseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AuctionCaseWhereUniqueInputSchema),z.lazy(() => AuctionCaseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AuctionCaseWhereUniqueInputSchema),z.lazy(() => AuctionCaseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AuctionCaseUpdateWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => AuctionCaseUpdateWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AuctionCaseUpdateManyWithWhereWithoutGroupInputSchema),z.lazy(() => AuctionCaseUpdateManyWithWhereWithoutGroupInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AuctionCaseScalarWhereInputSchema),z.lazy(() => AuctionCaseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UsersOnGroupsUncheckedUpdateManyWithoutGroupNestedInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedUpdateManyWithoutGroupNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersOnGroupsCreateWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsCreateWithoutGroupInputSchema).array(),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersOnGroupsCreateOrConnectWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsersOnGroupsUpsertWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsUpsertWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersOnGroupsCreateManyGroupInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),z.lazy(() => UsersOnGroupsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsersOnGroupsUpdateWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsUpdateWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsersOnGroupsUpdateManyWithWhereWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsUpdateManyWithWhereWithoutGroupInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsersOnGroupsScalarWhereInputSchema),z.lazy(() => UsersOnGroupsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AuctionCaseUncheckedUpdateManyWithoutGroupNestedInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedUpdateManyWithoutGroupNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuctionCaseCreateWithoutGroupInputSchema),z.lazy(() => AuctionCaseCreateWithoutGroupInputSchema).array(),z.lazy(() => AuctionCaseUncheckedCreateWithoutGroupInputSchema),z.lazy(() => AuctionCaseUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuctionCaseCreateOrConnectWithoutGroupInputSchema),z.lazy(() => AuctionCaseCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AuctionCaseUpsertWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => AuctionCaseUpsertWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuctionCaseCreateManyGroupInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AuctionCaseWhereUniqueInputSchema),z.lazy(() => AuctionCaseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AuctionCaseWhereUniqueInputSchema),z.lazy(() => AuctionCaseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AuctionCaseWhereUniqueInputSchema),z.lazy(() => AuctionCaseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AuctionCaseWhereUniqueInputSchema),z.lazy(() => AuctionCaseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AuctionCaseUpdateWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => AuctionCaseUpdateWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AuctionCaseUpdateManyWithWhereWithoutGroupInputSchema),z.lazy(() => AuctionCaseUpdateManyWithWhereWithoutGroupInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AuctionCaseScalarWhereInputSchema),z.lazy(() => AuctionCaseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutGroupsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutGroupsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutGroupsInputSchema),z.lazy(() => UserUncheckedCreateWithoutGroupsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGroupsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const GroupCreateNestedOneWithoutMembersInputSchema: z.ZodType<Prisma.GroupCreateNestedOneWithoutMembersInput> = z.object({
  create: z.union([ z.lazy(() => GroupCreateWithoutMembersInputSchema),z.lazy(() => GroupUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GroupCreateOrConnectWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => GroupWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutGroupsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutGroupsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutGroupsInputSchema),z.lazy(() => UserUncheckedCreateWithoutGroupsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGroupsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutGroupsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutGroupsInputSchema),z.lazy(() => UserUpdateWithoutGroupsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutGroupsInputSchema) ]).optional(),
}).strict();

export const GroupUpdateOneRequiredWithoutMembersNestedInputSchema: z.ZodType<Prisma.GroupUpdateOneRequiredWithoutMembersNestedInput> = z.object({
  create: z.union([ z.lazy(() => GroupCreateWithoutMembersInputSchema),z.lazy(() => GroupUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GroupCreateOrConnectWithoutMembersInputSchema).optional(),
  upsert: z.lazy(() => GroupUpsertWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => GroupWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GroupUpdateToOneWithWhereWithoutMembersInputSchema),z.lazy(() => GroupUpdateWithoutMembersInputSchema),z.lazy(() => GroupUncheckedUpdateWithoutMembersInputSchema) ]).optional(),
}).strict();

export const GroupCreateNestedOneWithoutAuctionCasesInputSchema: z.ZodType<Prisma.GroupCreateNestedOneWithoutAuctionCasesInput> = z.object({
  create: z.union([ z.lazy(() => GroupCreateWithoutAuctionCasesInputSchema),z.lazy(() => GroupUncheckedCreateWithoutAuctionCasesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GroupCreateOrConnectWithoutAuctionCasesInputSchema).optional(),
  connect: z.lazy(() => GroupWhereUniqueInputSchema).optional()
}).strict();

export const BidCreateNestedManyWithoutAuctionCaseInputSchema: z.ZodType<Prisma.BidCreateNestedManyWithoutAuctionCaseInput> = z.object({
  create: z.union([ z.lazy(() => BidCreateWithoutAuctionCaseInputSchema),z.lazy(() => BidCreateWithoutAuctionCaseInputSchema).array(),z.lazy(() => BidUncheckedCreateWithoutAuctionCaseInputSchema),z.lazy(() => BidUncheckedCreateWithoutAuctionCaseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BidCreateOrConnectWithoutAuctionCaseInputSchema),z.lazy(() => BidCreateOrConnectWithoutAuctionCaseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BidCreateManyAuctionCaseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ArticleCreateNestedManyWithoutAuctionCaseInputSchema: z.ZodType<Prisma.ArticleCreateNestedManyWithoutAuctionCaseInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuctionCaseInputSchema),z.lazy(() => ArticleCreateWithoutAuctionCaseInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutAuctionCaseInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuctionCaseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutAuctionCaseInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutAuctionCaseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyAuctionCaseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BidUncheckedCreateNestedManyWithoutAuctionCaseInputSchema: z.ZodType<Prisma.BidUncheckedCreateNestedManyWithoutAuctionCaseInput> = z.object({
  create: z.union([ z.lazy(() => BidCreateWithoutAuctionCaseInputSchema),z.lazy(() => BidCreateWithoutAuctionCaseInputSchema).array(),z.lazy(() => BidUncheckedCreateWithoutAuctionCaseInputSchema),z.lazy(() => BidUncheckedCreateWithoutAuctionCaseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BidCreateOrConnectWithoutAuctionCaseInputSchema),z.lazy(() => BidCreateOrConnectWithoutAuctionCaseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BidCreateManyAuctionCaseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ArticleUncheckedCreateNestedManyWithoutAuctionCaseInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateNestedManyWithoutAuctionCaseInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuctionCaseInputSchema),z.lazy(() => ArticleCreateWithoutAuctionCaseInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutAuctionCaseInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuctionCaseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutAuctionCaseInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutAuctionCaseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyAuctionCaseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const GroupUpdateOneRequiredWithoutAuctionCasesNestedInputSchema: z.ZodType<Prisma.GroupUpdateOneRequiredWithoutAuctionCasesNestedInput> = z.object({
  create: z.union([ z.lazy(() => GroupCreateWithoutAuctionCasesInputSchema),z.lazy(() => GroupUncheckedCreateWithoutAuctionCasesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GroupCreateOrConnectWithoutAuctionCasesInputSchema).optional(),
  upsert: z.lazy(() => GroupUpsertWithoutAuctionCasesInputSchema).optional(),
  connect: z.lazy(() => GroupWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GroupUpdateToOneWithWhereWithoutAuctionCasesInputSchema),z.lazy(() => GroupUpdateWithoutAuctionCasesInputSchema),z.lazy(() => GroupUncheckedUpdateWithoutAuctionCasesInputSchema) ]).optional(),
}).strict();

export const BidUpdateManyWithoutAuctionCaseNestedInputSchema: z.ZodType<Prisma.BidUpdateManyWithoutAuctionCaseNestedInput> = z.object({
  create: z.union([ z.lazy(() => BidCreateWithoutAuctionCaseInputSchema),z.lazy(() => BidCreateWithoutAuctionCaseInputSchema).array(),z.lazy(() => BidUncheckedCreateWithoutAuctionCaseInputSchema),z.lazy(() => BidUncheckedCreateWithoutAuctionCaseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BidCreateOrConnectWithoutAuctionCaseInputSchema),z.lazy(() => BidCreateOrConnectWithoutAuctionCaseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BidUpsertWithWhereUniqueWithoutAuctionCaseInputSchema),z.lazy(() => BidUpsertWithWhereUniqueWithoutAuctionCaseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BidCreateManyAuctionCaseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BidUpdateWithWhereUniqueWithoutAuctionCaseInputSchema),z.lazy(() => BidUpdateWithWhereUniqueWithoutAuctionCaseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BidUpdateManyWithWhereWithoutAuctionCaseInputSchema),z.lazy(() => BidUpdateManyWithWhereWithoutAuctionCaseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BidScalarWhereInputSchema),z.lazy(() => BidScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ArticleUpdateManyWithoutAuctionCaseNestedInputSchema: z.ZodType<Prisma.ArticleUpdateManyWithoutAuctionCaseNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuctionCaseInputSchema),z.lazy(() => ArticleCreateWithoutAuctionCaseInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutAuctionCaseInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuctionCaseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutAuctionCaseInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutAuctionCaseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ArticleUpsertWithWhereUniqueWithoutAuctionCaseInputSchema),z.lazy(() => ArticleUpsertWithWhereUniqueWithoutAuctionCaseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyAuctionCaseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ArticleUpdateWithWhereUniqueWithoutAuctionCaseInputSchema),z.lazy(() => ArticleUpdateWithWhereUniqueWithoutAuctionCaseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ArticleUpdateManyWithWhereWithoutAuctionCaseInputSchema),z.lazy(() => ArticleUpdateManyWithWhereWithoutAuctionCaseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ArticleScalarWhereInputSchema),z.lazy(() => ArticleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BidUncheckedUpdateManyWithoutAuctionCaseNestedInputSchema: z.ZodType<Prisma.BidUncheckedUpdateManyWithoutAuctionCaseNestedInput> = z.object({
  create: z.union([ z.lazy(() => BidCreateWithoutAuctionCaseInputSchema),z.lazy(() => BidCreateWithoutAuctionCaseInputSchema).array(),z.lazy(() => BidUncheckedCreateWithoutAuctionCaseInputSchema),z.lazy(() => BidUncheckedCreateWithoutAuctionCaseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BidCreateOrConnectWithoutAuctionCaseInputSchema),z.lazy(() => BidCreateOrConnectWithoutAuctionCaseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BidUpsertWithWhereUniqueWithoutAuctionCaseInputSchema),z.lazy(() => BidUpsertWithWhereUniqueWithoutAuctionCaseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BidCreateManyAuctionCaseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BidUpdateWithWhereUniqueWithoutAuctionCaseInputSchema),z.lazy(() => BidUpdateWithWhereUniqueWithoutAuctionCaseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BidUpdateManyWithWhereWithoutAuctionCaseInputSchema),z.lazy(() => BidUpdateManyWithWhereWithoutAuctionCaseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BidScalarWhereInputSchema),z.lazy(() => BidScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ArticleUncheckedUpdateManyWithoutAuctionCaseNestedInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateManyWithoutAuctionCaseNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuctionCaseInputSchema),z.lazy(() => ArticleCreateWithoutAuctionCaseInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutAuctionCaseInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuctionCaseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutAuctionCaseInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutAuctionCaseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ArticleUpsertWithWhereUniqueWithoutAuctionCaseInputSchema),z.lazy(() => ArticleUpsertWithWhereUniqueWithoutAuctionCaseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyAuctionCaseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ArticleUpdateWithWhereUniqueWithoutAuctionCaseInputSchema),z.lazy(() => ArticleUpdateWithWhereUniqueWithoutAuctionCaseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ArticleUpdateManyWithWhereWithoutAuctionCaseInputSchema),z.lazy(() => ArticleUpdateManyWithWhereWithoutAuctionCaseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ArticleScalarWhereInputSchema),z.lazy(() => ArticleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AuctionCaseCreateNestedOneWithoutBidsInputSchema: z.ZodType<Prisma.AuctionCaseCreateNestedOneWithoutBidsInput> = z.object({
  create: z.union([ z.lazy(() => AuctionCaseCreateWithoutBidsInputSchema),z.lazy(() => AuctionCaseUncheckedCreateWithoutBidsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AuctionCaseCreateOrConnectWithoutBidsInputSchema).optional(),
  connect: z.lazy(() => AuctionCaseWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutBidsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutBidsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBidsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBidsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBidsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const AuctionCaseUpdateOneRequiredWithoutBidsNestedInputSchema: z.ZodType<Prisma.AuctionCaseUpdateOneRequiredWithoutBidsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuctionCaseCreateWithoutBidsInputSchema),z.lazy(() => AuctionCaseUncheckedCreateWithoutBidsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AuctionCaseCreateOrConnectWithoutBidsInputSchema).optional(),
  upsert: z.lazy(() => AuctionCaseUpsertWithoutBidsInputSchema).optional(),
  connect: z.lazy(() => AuctionCaseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AuctionCaseUpdateToOneWithWhereWithoutBidsInputSchema),z.lazy(() => AuctionCaseUpdateWithoutBidsInputSchema),z.lazy(() => AuctionCaseUncheckedUpdateWithoutBidsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutBidsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutBidsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBidsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBidsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBidsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutBidsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutBidsInputSchema),z.lazy(() => UserUpdateWithoutBidsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBidsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutArticlesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutArticlesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedCreateWithoutArticlesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArticlesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const AuctionCaseCreateNestedOneWithoutArticlesInputSchema: z.ZodType<Prisma.AuctionCaseCreateNestedOneWithoutArticlesInput> = z.object({
  create: z.union([ z.lazy(() => AuctionCaseCreateWithoutArticlesInputSchema),z.lazy(() => AuctionCaseUncheckedCreateWithoutArticlesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AuctionCaseCreateOrConnectWithoutArticlesInputSchema).optional(),
  connect: z.lazy(() => AuctionCaseWhereUniqueInputSchema).optional()
}).strict();

export const AttachmentCreateNestedManyWithoutArticleInputSchema: z.ZodType<Prisma.AttachmentCreateNestedManyWithoutArticleInput> = z.object({
  create: z.union([ z.lazy(() => AttachmentCreateWithoutArticleInputSchema),z.lazy(() => AttachmentCreateWithoutArticleInputSchema).array(),z.lazy(() => AttachmentUncheckedCreateWithoutArticleInputSchema),z.lazy(() => AttachmentUncheckedCreateWithoutArticleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AttachmentCreateOrConnectWithoutArticleInputSchema),z.lazy(() => AttachmentCreateOrConnectWithoutArticleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AttachmentCreateManyArticleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AttachmentWhereUniqueInputSchema),z.lazy(() => AttachmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LikeOnArticleCreateNestedManyWithoutArticleInputSchema: z.ZodType<Prisma.LikeOnArticleCreateNestedManyWithoutArticleInput> = z.object({
  create: z.union([ z.lazy(() => LikeOnArticleCreateWithoutArticleInputSchema),z.lazy(() => LikeOnArticleCreateWithoutArticleInputSchema).array(),z.lazy(() => LikeOnArticleUncheckedCreateWithoutArticleInputSchema),z.lazy(() => LikeOnArticleUncheckedCreateWithoutArticleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeOnArticleCreateOrConnectWithoutArticleInputSchema),z.lazy(() => LikeOnArticleCreateOrConnectWithoutArticleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeOnArticleCreateManyArticleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LikeOnArticleWhereUniqueInputSchema),z.lazy(() => LikeOnArticleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AttachmentUncheckedCreateNestedManyWithoutArticleInputSchema: z.ZodType<Prisma.AttachmentUncheckedCreateNestedManyWithoutArticleInput> = z.object({
  create: z.union([ z.lazy(() => AttachmentCreateWithoutArticleInputSchema),z.lazy(() => AttachmentCreateWithoutArticleInputSchema).array(),z.lazy(() => AttachmentUncheckedCreateWithoutArticleInputSchema),z.lazy(() => AttachmentUncheckedCreateWithoutArticleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AttachmentCreateOrConnectWithoutArticleInputSchema),z.lazy(() => AttachmentCreateOrConnectWithoutArticleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AttachmentCreateManyArticleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AttachmentWhereUniqueInputSchema),z.lazy(() => AttachmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LikeOnArticleUncheckedCreateNestedManyWithoutArticleInputSchema: z.ZodType<Prisma.LikeOnArticleUncheckedCreateNestedManyWithoutArticleInput> = z.object({
  create: z.union([ z.lazy(() => LikeOnArticleCreateWithoutArticleInputSchema),z.lazy(() => LikeOnArticleCreateWithoutArticleInputSchema).array(),z.lazy(() => LikeOnArticleUncheckedCreateWithoutArticleInputSchema),z.lazy(() => LikeOnArticleUncheckedCreateWithoutArticleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeOnArticleCreateOrConnectWithoutArticleInputSchema),z.lazy(() => LikeOnArticleCreateOrConnectWithoutArticleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeOnArticleCreateManyArticleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LikeOnArticleWhereUniqueInputSchema),z.lazy(() => LikeOnArticleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutArticlesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutArticlesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedCreateWithoutArticlesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArticlesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutArticlesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutArticlesInputSchema),z.lazy(() => UserUpdateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutArticlesInputSchema) ]).optional(),
}).strict();

export const AuctionCaseUpdateOneWithoutArticlesNestedInputSchema: z.ZodType<Prisma.AuctionCaseUpdateOneWithoutArticlesNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuctionCaseCreateWithoutArticlesInputSchema),z.lazy(() => AuctionCaseUncheckedCreateWithoutArticlesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AuctionCaseCreateOrConnectWithoutArticlesInputSchema).optional(),
  upsert: z.lazy(() => AuctionCaseUpsertWithoutArticlesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AuctionCaseWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AuctionCaseWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AuctionCaseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AuctionCaseUpdateToOneWithWhereWithoutArticlesInputSchema),z.lazy(() => AuctionCaseUpdateWithoutArticlesInputSchema),z.lazy(() => AuctionCaseUncheckedUpdateWithoutArticlesInputSchema) ]).optional(),
}).strict();

export const AttachmentUpdateManyWithoutArticleNestedInputSchema: z.ZodType<Prisma.AttachmentUpdateManyWithoutArticleNestedInput> = z.object({
  create: z.union([ z.lazy(() => AttachmentCreateWithoutArticleInputSchema),z.lazy(() => AttachmentCreateWithoutArticleInputSchema).array(),z.lazy(() => AttachmentUncheckedCreateWithoutArticleInputSchema),z.lazy(() => AttachmentUncheckedCreateWithoutArticleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AttachmentCreateOrConnectWithoutArticleInputSchema),z.lazy(() => AttachmentCreateOrConnectWithoutArticleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AttachmentUpsertWithWhereUniqueWithoutArticleInputSchema),z.lazy(() => AttachmentUpsertWithWhereUniqueWithoutArticleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AttachmentCreateManyArticleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AttachmentWhereUniqueInputSchema),z.lazy(() => AttachmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AttachmentWhereUniqueInputSchema),z.lazy(() => AttachmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AttachmentWhereUniqueInputSchema),z.lazy(() => AttachmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AttachmentWhereUniqueInputSchema),z.lazy(() => AttachmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AttachmentUpdateWithWhereUniqueWithoutArticleInputSchema),z.lazy(() => AttachmentUpdateWithWhereUniqueWithoutArticleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AttachmentUpdateManyWithWhereWithoutArticleInputSchema),z.lazy(() => AttachmentUpdateManyWithWhereWithoutArticleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AttachmentScalarWhereInputSchema),z.lazy(() => AttachmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LikeOnArticleUpdateManyWithoutArticleNestedInputSchema: z.ZodType<Prisma.LikeOnArticleUpdateManyWithoutArticleNestedInput> = z.object({
  create: z.union([ z.lazy(() => LikeOnArticleCreateWithoutArticleInputSchema),z.lazy(() => LikeOnArticleCreateWithoutArticleInputSchema).array(),z.lazy(() => LikeOnArticleUncheckedCreateWithoutArticleInputSchema),z.lazy(() => LikeOnArticleUncheckedCreateWithoutArticleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeOnArticleCreateOrConnectWithoutArticleInputSchema),z.lazy(() => LikeOnArticleCreateOrConnectWithoutArticleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LikeOnArticleUpsertWithWhereUniqueWithoutArticleInputSchema),z.lazy(() => LikeOnArticleUpsertWithWhereUniqueWithoutArticleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeOnArticleCreateManyArticleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LikeOnArticleWhereUniqueInputSchema),z.lazy(() => LikeOnArticleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LikeOnArticleWhereUniqueInputSchema),z.lazy(() => LikeOnArticleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LikeOnArticleWhereUniqueInputSchema),z.lazy(() => LikeOnArticleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LikeOnArticleWhereUniqueInputSchema),z.lazy(() => LikeOnArticleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LikeOnArticleUpdateWithWhereUniqueWithoutArticleInputSchema),z.lazy(() => LikeOnArticleUpdateWithWhereUniqueWithoutArticleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LikeOnArticleUpdateManyWithWhereWithoutArticleInputSchema),z.lazy(() => LikeOnArticleUpdateManyWithWhereWithoutArticleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LikeOnArticleScalarWhereInputSchema),z.lazy(() => LikeOnArticleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AttachmentUncheckedUpdateManyWithoutArticleNestedInputSchema: z.ZodType<Prisma.AttachmentUncheckedUpdateManyWithoutArticleNestedInput> = z.object({
  create: z.union([ z.lazy(() => AttachmentCreateWithoutArticleInputSchema),z.lazy(() => AttachmentCreateWithoutArticleInputSchema).array(),z.lazy(() => AttachmentUncheckedCreateWithoutArticleInputSchema),z.lazy(() => AttachmentUncheckedCreateWithoutArticleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AttachmentCreateOrConnectWithoutArticleInputSchema),z.lazy(() => AttachmentCreateOrConnectWithoutArticleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AttachmentUpsertWithWhereUniqueWithoutArticleInputSchema),z.lazy(() => AttachmentUpsertWithWhereUniqueWithoutArticleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AttachmentCreateManyArticleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AttachmentWhereUniqueInputSchema),z.lazy(() => AttachmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AttachmentWhereUniqueInputSchema),z.lazy(() => AttachmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AttachmentWhereUniqueInputSchema),z.lazy(() => AttachmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AttachmentWhereUniqueInputSchema),z.lazy(() => AttachmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AttachmentUpdateWithWhereUniqueWithoutArticleInputSchema),z.lazy(() => AttachmentUpdateWithWhereUniqueWithoutArticleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AttachmentUpdateManyWithWhereWithoutArticleInputSchema),z.lazy(() => AttachmentUpdateManyWithWhereWithoutArticleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AttachmentScalarWhereInputSchema),z.lazy(() => AttachmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LikeOnArticleUncheckedUpdateManyWithoutArticleNestedInputSchema: z.ZodType<Prisma.LikeOnArticleUncheckedUpdateManyWithoutArticleNestedInput> = z.object({
  create: z.union([ z.lazy(() => LikeOnArticleCreateWithoutArticleInputSchema),z.lazy(() => LikeOnArticleCreateWithoutArticleInputSchema).array(),z.lazy(() => LikeOnArticleUncheckedCreateWithoutArticleInputSchema),z.lazy(() => LikeOnArticleUncheckedCreateWithoutArticleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeOnArticleCreateOrConnectWithoutArticleInputSchema),z.lazy(() => LikeOnArticleCreateOrConnectWithoutArticleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LikeOnArticleUpsertWithWhereUniqueWithoutArticleInputSchema),z.lazy(() => LikeOnArticleUpsertWithWhereUniqueWithoutArticleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeOnArticleCreateManyArticleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LikeOnArticleWhereUniqueInputSchema),z.lazy(() => LikeOnArticleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LikeOnArticleWhereUniqueInputSchema),z.lazy(() => LikeOnArticleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LikeOnArticleWhereUniqueInputSchema),z.lazy(() => LikeOnArticleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LikeOnArticleWhereUniqueInputSchema),z.lazy(() => LikeOnArticleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LikeOnArticleUpdateWithWhereUniqueWithoutArticleInputSchema),z.lazy(() => LikeOnArticleUpdateWithWhereUniqueWithoutArticleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LikeOnArticleUpdateManyWithWhereWithoutArticleInputSchema),z.lazy(() => LikeOnArticleUpdateManyWithWhereWithoutArticleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LikeOnArticleScalarWhereInputSchema),z.lazy(() => LikeOnArticleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ArticleCreateNestedOneWithoutLikesInputSchema: z.ZodType<Prisma.ArticleCreateNestedOneWithoutLikesInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutLikesInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ArticleCreateOrConnectWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => ArticleWhereUniqueInputSchema).optional()
}).strict();

export const ArticleUpdateOneWithoutLikesNestedInputSchema: z.ZodType<Prisma.ArticleUpdateOneWithoutLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutLikesInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ArticleCreateOrConnectWithoutLikesInputSchema).optional(),
  upsert: z.lazy(() => ArticleUpsertWithoutLikesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ArticleWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ArticleWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ArticleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ArticleUpdateToOneWithWhereWithoutLikesInputSchema),z.lazy(() => ArticleUpdateWithoutLikesInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutLikesInputSchema) ]).optional(),
}).strict();

export const ArticleCreateNestedOneWithoutAttachmentsInputSchema: z.ZodType<Prisma.ArticleCreateNestedOneWithoutAttachmentsInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutAttachmentsInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAttachmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ArticleCreateOrConnectWithoutAttachmentsInputSchema).optional(),
  connect: z.lazy(() => ArticleWhereUniqueInputSchema).optional()
}).strict();

export const ArticleUpdateOneWithoutAttachmentsNestedInputSchema: z.ZodType<Prisma.ArticleUpdateOneWithoutAttachmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutAttachmentsInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAttachmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ArticleCreateOrConnectWithoutAttachmentsInputSchema).optional(),
  upsert: z.lazy(() => ArticleUpsertWithoutAttachmentsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ArticleWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ArticleWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ArticleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ArticleUpdateToOneWithWhereWithoutAttachmentsInputSchema),z.lazy(() => ArticleUpdateWithoutAttachmentsInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutAttachmentsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UsersOnGroupsCreateWithoutUserInputSchema: z.ZodType<Prisma.UsersOnGroupsCreateWithoutUserInput> = z.object({
  invitedBy: z.string(),
  joinedAt: z.coerce.date().optional(),
  group: z.lazy(() => GroupCreateNestedOneWithoutMembersInputSchema)
}).strict();

export const UsersOnGroupsUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedCreateWithoutUserInput> = z.object({
  groupId: z.string(),
  invitedBy: z.string(),
  joinedAt: z.coerce.date().optional()
}).strict();

export const UsersOnGroupsCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UsersOnGroupsCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersOnGroupsCreateWithoutUserInputSchema),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UsersOnGroupsCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UsersOnGroupsCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UsersOnGroupsCreateManyUserInputSchema),z.lazy(() => UsersOnGroupsCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BidCreateWithoutUserInputSchema: z.ZodType<Prisma.BidCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  expectedSalePrice: z.number().int().optional(),
  acquisitionCost: z.number().int().optional(),
  evacuationCost: z.number().int().optional(),
  repairCost: z.number().int().optional(),
  brokerageFee: z.number().int().optional(),
  estimatedInterest: z.number().int().optional(),
  otherCost: z.number().int().optional(),
  expectedProfit: z.number().int().optional(),
  biddingPrice: z.number().int().optional(),
  isExcluded: z.boolean().optional(),
  excludedReason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  auctionCase: z.lazy(() => AuctionCaseCreateNestedOneWithoutBidsInputSchema)
}).strict();

export const BidUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.BidUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  auctionCaseId: z.string(),
  expectedSalePrice: z.number().int().optional(),
  acquisitionCost: z.number().int().optional(),
  evacuationCost: z.number().int().optional(),
  repairCost: z.number().int().optional(),
  brokerageFee: z.number().int().optional(),
  estimatedInterest: z.number().int().optional(),
  otherCost: z.number().int().optional(),
  expectedProfit: z.number().int().optional(),
  biddingPrice: z.number().int().optional(),
  isExcluded: z.boolean().optional(),
  excludedReason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BidCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.BidCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => BidWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BidCreateWithoutUserInputSchema),z.lazy(() => BidUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const BidCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.BidCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BidCreateManyUserInputSchema),z.lazy(() => BidCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ArticleCreateWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string().optional().nullable(),
  contentHtml: z.string().optional().nullable(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  auctionCase: z.lazy(() => AuctionCaseCreateNestedOneWithoutArticlesInputSchema).optional(),
  attachments: z.lazy(() => AttachmentCreateNestedManyWithoutArticleInputSchema).optional(),
  likes: z.lazy(() => LikeOnArticleCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export const ArticleUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  auctionCaseId: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  contentHtml: z.string().optional().nullable(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  attachments: z.lazy(() => AttachmentUncheckedCreateNestedManyWithoutArticleInputSchema).optional(),
  likes: z.lazy(() => LikeOnArticleUncheckedCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export const ArticleCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const ArticleCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.ArticleCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ArticleCreateManyAuthorInputSchema),z.lazy(() => ArticleCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UsersOnGroupsUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UsersOnGroupsUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UsersOnGroupsUpdateWithoutUserInputSchema),z.lazy(() => UsersOnGroupsUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UsersOnGroupsCreateWithoutUserInputSchema),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UsersOnGroupsUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UsersOnGroupsUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UsersOnGroupsUpdateWithoutUserInputSchema),z.lazy(() => UsersOnGroupsUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UsersOnGroupsUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UsersOnGroupsUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UsersOnGroupsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UsersOnGroupsUpdateManyMutationInputSchema),z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UsersOnGroupsScalarWhereInputSchema: z.ZodType<Prisma.UsersOnGroupsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UsersOnGroupsScalarWhereInputSchema),z.lazy(() => UsersOnGroupsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersOnGroupsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersOnGroupsScalarWhereInputSchema),z.lazy(() => UsersOnGroupsScalarWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  groupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  invitedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  joinedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const BidUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BidUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BidWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BidUpdateWithoutUserInputSchema),z.lazy(() => BidUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => BidCreateWithoutUserInputSchema),z.lazy(() => BidUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const BidUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BidUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BidWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BidUpdateWithoutUserInputSchema),z.lazy(() => BidUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const BidUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.BidUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => BidScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BidUpdateManyMutationInputSchema),z.lazy(() => BidUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const BidScalarWhereInputSchema: z.ZodType<Prisma.BidScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BidScalarWhereInputSchema),z.lazy(() => BidScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BidScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BidScalarWhereInputSchema),z.lazy(() => BidScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  auctionCaseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expectedSalePrice: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  acquisitionCost: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  evacuationCost: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  repairCost: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  brokerageFee: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  estimatedInterest: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  otherCost: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  expectedProfit: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  biddingPrice: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  isExcluded: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  excludedReason: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ArticleUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ArticleUpdateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const ArticleUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ArticleUpdateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const ArticleUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => ArticleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ArticleUpdateManyMutationInputSchema),z.lazy(() => ArticleUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const ArticleScalarWhereInputSchema: z.ZodType<Prisma.ArticleScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ArticleScalarWhereInputSchema),z.lazy(() => ArticleScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArticleScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArticleScalarWhereInputSchema),z.lazy(() => ArticleScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  auctionCaseId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contentHtml: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isPublished: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
  points: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutUserInputSchema).optional(),
  bids: z.lazy(() => BidCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
  points: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mobile: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUpdateManyWithoutUserNestedInputSchema).optional(),
  bids: z.lazy(() => BidUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mobile: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
  points: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutUserInputSchema).optional(),
  bids: z.lazy(() => BidCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
  points: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mobile: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUpdateManyWithoutUserNestedInputSchema).optional(),
  bids: z.lazy(() => BidUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mobile: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UsersOnGroupsCreateWithoutGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsCreateWithoutGroupInput> = z.object({
  invitedBy: z.string(),
  joinedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutGroupsInputSchema)
}).strict();

export const UsersOnGroupsUncheckedCreateWithoutGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedCreateWithoutGroupInput> = z.object({
  userId: z.string(),
  invitedBy: z.string(),
  joinedAt: z.coerce.date().optional()
}).strict();

export const UsersOnGroupsCreateOrConnectWithoutGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsCreateOrConnectWithoutGroupInput> = z.object({
  where: z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersOnGroupsCreateWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutGroupInputSchema) ]),
}).strict();

export const UsersOnGroupsCreateManyGroupInputEnvelopeSchema: z.ZodType<Prisma.UsersOnGroupsCreateManyGroupInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UsersOnGroupsCreateManyGroupInputSchema),z.lazy(() => UsersOnGroupsCreateManyGroupInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AuctionCaseCreateWithoutGroupInputSchema: z.ZodType<Prisma.AuctionCaseCreateWithoutGroupInput> = z.object({
  id: z.string().cuid().optional(),
  caseName: z.string(),
  address: z.string().optional().nullable(),
  addressDetail: z.string().optional().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  image: z.string().optional().nullable(),
  actualBidStartsAt: z.coerce.date().optional().nullable(),
  appraisedValue: z.number().int().optional(),
  startingBid: z.number().int().optional(),
  officialValue: z.number().int().optional(),
  area: z.number().optional().nullable(),
  floorLevel: z.number().int().optional().nullable(),
  floorPlan: z.string().optional().nullable(),
  hasElevator: z.boolean().optional(),
  completedYear: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bids: z.lazy(() => BidCreateNestedManyWithoutAuctionCaseInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutAuctionCaseInputSchema).optional()
}).strict();

export const AuctionCaseUncheckedCreateWithoutGroupInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedCreateWithoutGroupInput> = z.object({
  id: z.string().cuid().optional(),
  caseName: z.string(),
  address: z.string().optional().nullable(),
  addressDetail: z.string().optional().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  image: z.string().optional().nullable(),
  actualBidStartsAt: z.coerce.date().optional().nullable(),
  appraisedValue: z.number().int().optional(),
  startingBid: z.number().int().optional(),
  officialValue: z.number().int().optional(),
  area: z.number().optional().nullable(),
  floorLevel: z.number().int().optional().nullable(),
  floorPlan: z.string().optional().nullable(),
  hasElevator: z.boolean().optional(),
  completedYear: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bids: z.lazy(() => BidUncheckedCreateNestedManyWithoutAuctionCaseInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutAuctionCaseInputSchema).optional()
}).strict();

export const AuctionCaseCreateOrConnectWithoutGroupInputSchema: z.ZodType<Prisma.AuctionCaseCreateOrConnectWithoutGroupInput> = z.object({
  where: z.lazy(() => AuctionCaseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AuctionCaseCreateWithoutGroupInputSchema),z.lazy(() => AuctionCaseUncheckedCreateWithoutGroupInputSchema) ]),
}).strict();

export const AuctionCaseCreateManyGroupInputEnvelopeSchema: z.ZodType<Prisma.AuctionCaseCreateManyGroupInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AuctionCaseCreateManyGroupInputSchema),z.lazy(() => AuctionCaseCreateManyGroupInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UsersOnGroupsUpsertWithWhereUniqueWithoutGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsUpsertWithWhereUniqueWithoutGroupInput> = z.object({
  where: z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UsersOnGroupsUpdateWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsUncheckedUpdateWithoutGroupInputSchema) ]),
  create: z.union([ z.lazy(() => UsersOnGroupsCreateWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsUncheckedCreateWithoutGroupInputSchema) ]),
}).strict();

export const UsersOnGroupsUpdateWithWhereUniqueWithoutGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsUpdateWithWhereUniqueWithoutGroupInput> = z.object({
  where: z.lazy(() => UsersOnGroupsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UsersOnGroupsUpdateWithoutGroupInputSchema),z.lazy(() => UsersOnGroupsUncheckedUpdateWithoutGroupInputSchema) ]),
}).strict();

export const UsersOnGroupsUpdateManyWithWhereWithoutGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsUpdateManyWithWhereWithoutGroupInput> = z.object({
  where: z.lazy(() => UsersOnGroupsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UsersOnGroupsUpdateManyMutationInputSchema),z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutGroupInputSchema) ]),
}).strict();

export const AuctionCaseUpsertWithWhereUniqueWithoutGroupInputSchema: z.ZodType<Prisma.AuctionCaseUpsertWithWhereUniqueWithoutGroupInput> = z.object({
  where: z.lazy(() => AuctionCaseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AuctionCaseUpdateWithoutGroupInputSchema),z.lazy(() => AuctionCaseUncheckedUpdateWithoutGroupInputSchema) ]),
  create: z.union([ z.lazy(() => AuctionCaseCreateWithoutGroupInputSchema),z.lazy(() => AuctionCaseUncheckedCreateWithoutGroupInputSchema) ]),
}).strict();

export const AuctionCaseUpdateWithWhereUniqueWithoutGroupInputSchema: z.ZodType<Prisma.AuctionCaseUpdateWithWhereUniqueWithoutGroupInput> = z.object({
  where: z.lazy(() => AuctionCaseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AuctionCaseUpdateWithoutGroupInputSchema),z.lazy(() => AuctionCaseUncheckedUpdateWithoutGroupInputSchema) ]),
}).strict();

export const AuctionCaseUpdateManyWithWhereWithoutGroupInputSchema: z.ZodType<Prisma.AuctionCaseUpdateManyWithWhereWithoutGroupInput> = z.object({
  where: z.lazy(() => AuctionCaseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AuctionCaseUpdateManyMutationInputSchema),z.lazy(() => AuctionCaseUncheckedUpdateManyWithoutGroupInputSchema) ]),
}).strict();

export const AuctionCaseScalarWhereInputSchema: z.ZodType<Prisma.AuctionCaseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AuctionCaseScalarWhereInputSchema),z.lazy(() => AuctionCaseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuctionCaseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuctionCaseScalarWhereInputSchema),z.lazy(() => AuctionCaseScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  groupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  caseName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  addressDetail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bidStartsAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  bidEndsAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  actualBidStartsAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  appraisedValue: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  startingBid: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  officialValue: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  area: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  floorLevel: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  floorPlan: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  hasElevator: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  completedYear: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutGroupsInputSchema: z.ZodType<Prisma.UserCreateWithoutGroupsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
  points: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  bids: z.lazy(() => BidCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutGroupsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutGroupsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
  points: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutGroupsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutGroupsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutGroupsInputSchema),z.lazy(() => UserUncheckedCreateWithoutGroupsInputSchema) ]),
}).strict();

export const GroupCreateWithoutMembersInputSchema: z.ZodType<Prisma.GroupCreateWithoutMembersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  hostId: z.string(),
  isPrivate: z.boolean().optional(),
  password: z.string().optional().nullable(),
  maxMembers: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  archivedAt: z.coerce.date().optional().nullable(),
  auctionCases: z.lazy(() => AuctionCaseCreateNestedManyWithoutGroupInputSchema).optional()
}).strict();

export const GroupUncheckedCreateWithoutMembersInputSchema: z.ZodType<Prisma.GroupUncheckedCreateWithoutMembersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  hostId: z.string(),
  isPrivate: z.boolean().optional(),
  password: z.string().optional().nullable(),
  maxMembers: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  archivedAt: z.coerce.date().optional().nullable(),
  auctionCases: z.lazy(() => AuctionCaseUncheckedCreateNestedManyWithoutGroupInputSchema).optional()
}).strict();

export const GroupCreateOrConnectWithoutMembersInputSchema: z.ZodType<Prisma.GroupCreateOrConnectWithoutMembersInput> = z.object({
  where: z.lazy(() => GroupWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GroupCreateWithoutMembersInputSchema),z.lazy(() => GroupUncheckedCreateWithoutMembersInputSchema) ]),
}).strict();

export const UserUpsertWithoutGroupsInputSchema: z.ZodType<Prisma.UserUpsertWithoutGroupsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutGroupsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutGroupsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutGroupsInputSchema),z.lazy(() => UserUncheckedCreateWithoutGroupsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutGroupsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGroupsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutGroupsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutGroupsInputSchema) ]),
}).strict();

export const UserUpdateWithoutGroupsInputSchema: z.ZodType<Prisma.UserUpdateWithoutGroupsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mobile: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  bids: z.lazy(() => BidUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutGroupsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutGroupsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mobile: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const GroupUpsertWithoutMembersInputSchema: z.ZodType<Prisma.GroupUpsertWithoutMembersInput> = z.object({
  update: z.union([ z.lazy(() => GroupUpdateWithoutMembersInputSchema),z.lazy(() => GroupUncheckedUpdateWithoutMembersInputSchema) ]),
  create: z.union([ z.lazy(() => GroupCreateWithoutMembersInputSchema),z.lazy(() => GroupUncheckedCreateWithoutMembersInputSchema) ]),
  where: z.lazy(() => GroupWhereInputSchema).optional()
}).strict();

export const GroupUpdateToOneWithWhereWithoutMembersInputSchema: z.ZodType<Prisma.GroupUpdateToOneWithWhereWithoutMembersInput> = z.object({
  where: z.lazy(() => GroupWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => GroupUpdateWithoutMembersInputSchema),z.lazy(() => GroupUncheckedUpdateWithoutMembersInputSchema) ]),
}).strict();

export const GroupUpdateWithoutMembersInputSchema: z.ZodType<Prisma.GroupUpdateWithoutMembersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxMembers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  archivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auctionCases: z.lazy(() => AuctionCaseUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const GroupUncheckedUpdateWithoutMembersInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateWithoutMembersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxMembers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  archivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auctionCases: z.lazy(() => AuctionCaseUncheckedUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const GroupCreateWithoutAuctionCasesInputSchema: z.ZodType<Prisma.GroupCreateWithoutAuctionCasesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  hostId: z.string(),
  isPrivate: z.boolean().optional(),
  password: z.string().optional().nullable(),
  maxMembers: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  archivedAt: z.coerce.date().optional().nullable(),
  members: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutGroupInputSchema).optional()
}).strict();

export const GroupUncheckedCreateWithoutAuctionCasesInputSchema: z.ZodType<Prisma.GroupUncheckedCreateWithoutAuctionCasesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  hostId: z.string(),
  isPrivate: z.boolean().optional(),
  password: z.string().optional().nullable(),
  maxMembers: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  archivedAt: z.coerce.date().optional().nullable(),
  members: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutGroupInputSchema).optional()
}).strict();

export const GroupCreateOrConnectWithoutAuctionCasesInputSchema: z.ZodType<Prisma.GroupCreateOrConnectWithoutAuctionCasesInput> = z.object({
  where: z.lazy(() => GroupWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GroupCreateWithoutAuctionCasesInputSchema),z.lazy(() => GroupUncheckedCreateWithoutAuctionCasesInputSchema) ]),
}).strict();

export const BidCreateWithoutAuctionCaseInputSchema: z.ZodType<Prisma.BidCreateWithoutAuctionCaseInput> = z.object({
  id: z.string().cuid().optional(),
  expectedSalePrice: z.number().int().optional(),
  acquisitionCost: z.number().int().optional(),
  evacuationCost: z.number().int().optional(),
  repairCost: z.number().int().optional(),
  brokerageFee: z.number().int().optional(),
  estimatedInterest: z.number().int().optional(),
  otherCost: z.number().int().optional(),
  expectedProfit: z.number().int().optional(),
  biddingPrice: z.number().int().optional(),
  isExcluded: z.boolean().optional(),
  excludedReason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBidsInputSchema)
}).strict();

export const BidUncheckedCreateWithoutAuctionCaseInputSchema: z.ZodType<Prisma.BidUncheckedCreateWithoutAuctionCaseInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  expectedSalePrice: z.number().int().optional(),
  acquisitionCost: z.number().int().optional(),
  evacuationCost: z.number().int().optional(),
  repairCost: z.number().int().optional(),
  brokerageFee: z.number().int().optional(),
  estimatedInterest: z.number().int().optional(),
  otherCost: z.number().int().optional(),
  expectedProfit: z.number().int().optional(),
  biddingPrice: z.number().int().optional(),
  isExcluded: z.boolean().optional(),
  excludedReason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BidCreateOrConnectWithoutAuctionCaseInputSchema: z.ZodType<Prisma.BidCreateOrConnectWithoutAuctionCaseInput> = z.object({
  where: z.lazy(() => BidWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BidCreateWithoutAuctionCaseInputSchema),z.lazy(() => BidUncheckedCreateWithoutAuctionCaseInputSchema) ]),
}).strict();

export const BidCreateManyAuctionCaseInputEnvelopeSchema: z.ZodType<Prisma.BidCreateManyAuctionCaseInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BidCreateManyAuctionCaseInputSchema),z.lazy(() => BidCreateManyAuctionCaseInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ArticleCreateWithoutAuctionCaseInputSchema: z.ZodType<Prisma.ArticleCreateWithoutAuctionCaseInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string().optional().nullable(),
  contentHtml: z.string().optional().nullable(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutArticlesInputSchema),
  attachments: z.lazy(() => AttachmentCreateNestedManyWithoutArticleInputSchema).optional(),
  likes: z.lazy(() => LikeOnArticleCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export const ArticleUncheckedCreateWithoutAuctionCaseInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateWithoutAuctionCaseInput> = z.object({
  id: z.string().cuid().optional(),
  authorId: z.string(),
  title: z.string().optional().nullable(),
  contentHtml: z.string().optional().nullable(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  attachments: z.lazy(() => AttachmentUncheckedCreateNestedManyWithoutArticleInputSchema).optional(),
  likes: z.lazy(() => LikeOnArticleUncheckedCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export const ArticleCreateOrConnectWithoutAuctionCaseInputSchema: z.ZodType<Prisma.ArticleCreateOrConnectWithoutAuctionCaseInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuctionCaseInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuctionCaseInputSchema) ]),
}).strict();

export const ArticleCreateManyAuctionCaseInputEnvelopeSchema: z.ZodType<Prisma.ArticleCreateManyAuctionCaseInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ArticleCreateManyAuctionCaseInputSchema),z.lazy(() => ArticleCreateManyAuctionCaseInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const GroupUpsertWithoutAuctionCasesInputSchema: z.ZodType<Prisma.GroupUpsertWithoutAuctionCasesInput> = z.object({
  update: z.union([ z.lazy(() => GroupUpdateWithoutAuctionCasesInputSchema),z.lazy(() => GroupUncheckedUpdateWithoutAuctionCasesInputSchema) ]),
  create: z.union([ z.lazy(() => GroupCreateWithoutAuctionCasesInputSchema),z.lazy(() => GroupUncheckedCreateWithoutAuctionCasesInputSchema) ]),
  where: z.lazy(() => GroupWhereInputSchema).optional()
}).strict();

export const GroupUpdateToOneWithWhereWithoutAuctionCasesInputSchema: z.ZodType<Prisma.GroupUpdateToOneWithWhereWithoutAuctionCasesInput> = z.object({
  where: z.lazy(() => GroupWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => GroupUpdateWithoutAuctionCasesInputSchema),z.lazy(() => GroupUncheckedUpdateWithoutAuctionCasesInputSchema) ]),
}).strict();

export const GroupUpdateWithoutAuctionCasesInputSchema: z.ZodType<Prisma.GroupUpdateWithoutAuctionCasesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxMembers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  archivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  members: z.lazy(() => UsersOnGroupsUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const GroupUncheckedUpdateWithoutAuctionCasesInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateWithoutAuctionCasesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxMembers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  archivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  members: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const BidUpsertWithWhereUniqueWithoutAuctionCaseInputSchema: z.ZodType<Prisma.BidUpsertWithWhereUniqueWithoutAuctionCaseInput> = z.object({
  where: z.lazy(() => BidWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BidUpdateWithoutAuctionCaseInputSchema),z.lazy(() => BidUncheckedUpdateWithoutAuctionCaseInputSchema) ]),
  create: z.union([ z.lazy(() => BidCreateWithoutAuctionCaseInputSchema),z.lazy(() => BidUncheckedCreateWithoutAuctionCaseInputSchema) ]),
}).strict();

export const BidUpdateWithWhereUniqueWithoutAuctionCaseInputSchema: z.ZodType<Prisma.BidUpdateWithWhereUniqueWithoutAuctionCaseInput> = z.object({
  where: z.lazy(() => BidWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BidUpdateWithoutAuctionCaseInputSchema),z.lazy(() => BidUncheckedUpdateWithoutAuctionCaseInputSchema) ]),
}).strict();

export const BidUpdateManyWithWhereWithoutAuctionCaseInputSchema: z.ZodType<Prisma.BidUpdateManyWithWhereWithoutAuctionCaseInput> = z.object({
  where: z.lazy(() => BidScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BidUpdateManyMutationInputSchema),z.lazy(() => BidUncheckedUpdateManyWithoutAuctionCaseInputSchema) ]),
}).strict();

export const ArticleUpsertWithWhereUniqueWithoutAuctionCaseInputSchema: z.ZodType<Prisma.ArticleUpsertWithWhereUniqueWithoutAuctionCaseInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ArticleUpdateWithoutAuctionCaseInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutAuctionCaseInputSchema) ]),
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuctionCaseInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuctionCaseInputSchema) ]),
}).strict();

export const ArticleUpdateWithWhereUniqueWithoutAuctionCaseInputSchema: z.ZodType<Prisma.ArticleUpdateWithWhereUniqueWithoutAuctionCaseInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ArticleUpdateWithoutAuctionCaseInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutAuctionCaseInputSchema) ]),
}).strict();

export const ArticleUpdateManyWithWhereWithoutAuctionCaseInputSchema: z.ZodType<Prisma.ArticleUpdateManyWithWhereWithoutAuctionCaseInput> = z.object({
  where: z.lazy(() => ArticleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ArticleUpdateManyMutationInputSchema),z.lazy(() => ArticleUncheckedUpdateManyWithoutAuctionCaseInputSchema) ]),
}).strict();

export const AuctionCaseCreateWithoutBidsInputSchema: z.ZodType<Prisma.AuctionCaseCreateWithoutBidsInput> = z.object({
  id: z.string().cuid().optional(),
  caseName: z.string(),
  address: z.string().optional().nullable(),
  addressDetail: z.string().optional().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  image: z.string().optional().nullable(),
  actualBidStartsAt: z.coerce.date().optional().nullable(),
  appraisedValue: z.number().int().optional(),
  startingBid: z.number().int().optional(),
  officialValue: z.number().int().optional(),
  area: z.number().optional().nullable(),
  floorLevel: z.number().int().optional().nullable(),
  floorPlan: z.string().optional().nullable(),
  hasElevator: z.boolean().optional(),
  completedYear: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  group: z.lazy(() => GroupCreateNestedOneWithoutAuctionCasesInputSchema),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutAuctionCaseInputSchema).optional()
}).strict();

export const AuctionCaseUncheckedCreateWithoutBidsInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedCreateWithoutBidsInput> = z.object({
  id: z.string().cuid().optional(),
  groupId: z.string(),
  caseName: z.string(),
  address: z.string().optional().nullable(),
  addressDetail: z.string().optional().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  image: z.string().optional().nullable(),
  actualBidStartsAt: z.coerce.date().optional().nullable(),
  appraisedValue: z.number().int().optional(),
  startingBid: z.number().int().optional(),
  officialValue: z.number().int().optional(),
  area: z.number().optional().nullable(),
  floorLevel: z.number().int().optional().nullable(),
  floorPlan: z.string().optional().nullable(),
  hasElevator: z.boolean().optional(),
  completedYear: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutAuctionCaseInputSchema).optional()
}).strict();

export const AuctionCaseCreateOrConnectWithoutBidsInputSchema: z.ZodType<Prisma.AuctionCaseCreateOrConnectWithoutBidsInput> = z.object({
  where: z.lazy(() => AuctionCaseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AuctionCaseCreateWithoutBidsInputSchema),z.lazy(() => AuctionCaseUncheckedCreateWithoutBidsInputSchema) ]),
}).strict();

export const UserCreateWithoutBidsInputSchema: z.ZodType<Prisma.UserCreateWithoutBidsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
  points: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutBidsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBidsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
  points: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutBidsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBidsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutBidsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBidsInputSchema) ]),
}).strict();

export const AuctionCaseUpsertWithoutBidsInputSchema: z.ZodType<Prisma.AuctionCaseUpsertWithoutBidsInput> = z.object({
  update: z.union([ z.lazy(() => AuctionCaseUpdateWithoutBidsInputSchema),z.lazy(() => AuctionCaseUncheckedUpdateWithoutBidsInputSchema) ]),
  create: z.union([ z.lazy(() => AuctionCaseCreateWithoutBidsInputSchema),z.lazy(() => AuctionCaseUncheckedCreateWithoutBidsInputSchema) ]),
  where: z.lazy(() => AuctionCaseWhereInputSchema).optional()
}).strict();

export const AuctionCaseUpdateToOneWithWhereWithoutBidsInputSchema: z.ZodType<Prisma.AuctionCaseUpdateToOneWithWhereWithoutBidsInput> = z.object({
  where: z.lazy(() => AuctionCaseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AuctionCaseUpdateWithoutBidsInputSchema),z.lazy(() => AuctionCaseUncheckedUpdateWithoutBidsInputSchema) ]),
}).strict();

export const AuctionCaseUpdateWithoutBidsInputSchema: z.ZodType<Prisma.AuctionCaseUpdateWithoutBidsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  officialValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  area: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorLevel: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorPlan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasElevator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  completedYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  group: z.lazy(() => GroupUpdateOneRequiredWithoutAuctionCasesNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutAuctionCaseNestedInputSchema).optional()
}).strict();

export const AuctionCaseUncheckedUpdateWithoutBidsInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedUpdateWithoutBidsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  officialValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  area: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorLevel: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorPlan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasElevator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  completedYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutAuctionCaseNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutBidsInputSchema: z.ZodType<Prisma.UserUpsertWithoutBidsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutBidsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBidsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutBidsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBidsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutBidsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBidsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutBidsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBidsInputSchema) ]),
}).strict();

export const UserUpdateWithoutBidsInputSchema: z.ZodType<Prisma.UserUpdateWithoutBidsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mobile: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutBidsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutBidsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mobile: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutArticlesInputSchema: z.ZodType<Prisma.UserCreateWithoutArticlesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
  points: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutUserInputSchema).optional(),
  bids: z.lazy(() => BidCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutArticlesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutArticlesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
  points: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutArticlesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutArticlesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedCreateWithoutArticlesInputSchema) ]),
}).strict();

export const AuctionCaseCreateWithoutArticlesInputSchema: z.ZodType<Prisma.AuctionCaseCreateWithoutArticlesInput> = z.object({
  id: z.string().cuid().optional(),
  caseName: z.string(),
  address: z.string().optional().nullable(),
  addressDetail: z.string().optional().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  image: z.string().optional().nullable(),
  actualBidStartsAt: z.coerce.date().optional().nullable(),
  appraisedValue: z.number().int().optional(),
  startingBid: z.number().int().optional(),
  officialValue: z.number().int().optional(),
  area: z.number().optional().nullable(),
  floorLevel: z.number().int().optional().nullable(),
  floorPlan: z.string().optional().nullable(),
  hasElevator: z.boolean().optional(),
  completedYear: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  group: z.lazy(() => GroupCreateNestedOneWithoutAuctionCasesInputSchema),
  bids: z.lazy(() => BidCreateNestedManyWithoutAuctionCaseInputSchema).optional()
}).strict();

export const AuctionCaseUncheckedCreateWithoutArticlesInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedCreateWithoutArticlesInput> = z.object({
  id: z.string().cuid().optional(),
  groupId: z.string(),
  caseName: z.string(),
  address: z.string().optional().nullable(),
  addressDetail: z.string().optional().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  image: z.string().optional().nullable(),
  actualBidStartsAt: z.coerce.date().optional().nullable(),
  appraisedValue: z.number().int().optional(),
  startingBid: z.number().int().optional(),
  officialValue: z.number().int().optional(),
  area: z.number().optional().nullable(),
  floorLevel: z.number().int().optional().nullable(),
  floorPlan: z.string().optional().nullable(),
  hasElevator: z.boolean().optional(),
  completedYear: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bids: z.lazy(() => BidUncheckedCreateNestedManyWithoutAuctionCaseInputSchema).optional()
}).strict();

export const AuctionCaseCreateOrConnectWithoutArticlesInputSchema: z.ZodType<Prisma.AuctionCaseCreateOrConnectWithoutArticlesInput> = z.object({
  where: z.lazy(() => AuctionCaseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AuctionCaseCreateWithoutArticlesInputSchema),z.lazy(() => AuctionCaseUncheckedCreateWithoutArticlesInputSchema) ]),
}).strict();

export const AttachmentCreateWithoutArticleInputSchema: z.ZodType<Prisma.AttachmentCreateWithoutArticleInput> = z.object({
  id: z.string().cuid().optional(),
  fileName: z.string(),
  url: z.string()
}).strict();

export const AttachmentUncheckedCreateWithoutArticleInputSchema: z.ZodType<Prisma.AttachmentUncheckedCreateWithoutArticleInput> = z.object({
  id: z.string().cuid().optional(),
  fileName: z.string(),
  url: z.string()
}).strict();

export const AttachmentCreateOrConnectWithoutArticleInputSchema: z.ZodType<Prisma.AttachmentCreateOrConnectWithoutArticleInput> = z.object({
  where: z.lazy(() => AttachmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AttachmentCreateWithoutArticleInputSchema),z.lazy(() => AttachmentUncheckedCreateWithoutArticleInputSchema) ]),
}).strict();

export const AttachmentCreateManyArticleInputEnvelopeSchema: z.ZodType<Prisma.AttachmentCreateManyArticleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AttachmentCreateManyArticleInputSchema),z.lazy(() => AttachmentCreateManyArticleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LikeOnArticleCreateWithoutArticleInputSchema: z.ZodType<Prisma.LikeOnArticleCreateWithoutArticleInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LikeOnArticleUncheckedCreateWithoutArticleInputSchema: z.ZodType<Prisma.LikeOnArticleUncheckedCreateWithoutArticleInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LikeOnArticleCreateOrConnectWithoutArticleInputSchema: z.ZodType<Prisma.LikeOnArticleCreateOrConnectWithoutArticleInput> = z.object({
  where: z.lazy(() => LikeOnArticleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LikeOnArticleCreateWithoutArticleInputSchema),z.lazy(() => LikeOnArticleUncheckedCreateWithoutArticleInputSchema) ]),
}).strict();

export const LikeOnArticleCreateManyArticleInputEnvelopeSchema: z.ZodType<Prisma.LikeOnArticleCreateManyArticleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LikeOnArticleCreateManyArticleInputSchema),z.lazy(() => LikeOnArticleCreateManyArticleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutArticlesInputSchema: z.ZodType<Prisma.UserUpsertWithoutArticlesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutArticlesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedCreateWithoutArticlesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutArticlesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutArticlesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutArticlesInputSchema) ]),
}).strict();

export const UserUpdateWithoutArticlesInputSchema: z.ZodType<Prisma.UserUpdateWithoutArticlesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mobile: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUpdateManyWithoutUserNestedInputSchema).optional(),
  bids: z.lazy(() => BidUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutArticlesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutArticlesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mobile: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AuctionCaseUpsertWithoutArticlesInputSchema: z.ZodType<Prisma.AuctionCaseUpsertWithoutArticlesInput> = z.object({
  update: z.union([ z.lazy(() => AuctionCaseUpdateWithoutArticlesInputSchema),z.lazy(() => AuctionCaseUncheckedUpdateWithoutArticlesInputSchema) ]),
  create: z.union([ z.lazy(() => AuctionCaseCreateWithoutArticlesInputSchema),z.lazy(() => AuctionCaseUncheckedCreateWithoutArticlesInputSchema) ]),
  where: z.lazy(() => AuctionCaseWhereInputSchema).optional()
}).strict();

export const AuctionCaseUpdateToOneWithWhereWithoutArticlesInputSchema: z.ZodType<Prisma.AuctionCaseUpdateToOneWithWhereWithoutArticlesInput> = z.object({
  where: z.lazy(() => AuctionCaseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AuctionCaseUpdateWithoutArticlesInputSchema),z.lazy(() => AuctionCaseUncheckedUpdateWithoutArticlesInputSchema) ]),
}).strict();

export const AuctionCaseUpdateWithoutArticlesInputSchema: z.ZodType<Prisma.AuctionCaseUpdateWithoutArticlesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  officialValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  area: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorLevel: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorPlan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasElevator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  completedYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  group: z.lazy(() => GroupUpdateOneRequiredWithoutAuctionCasesNestedInputSchema).optional(),
  bids: z.lazy(() => BidUpdateManyWithoutAuctionCaseNestedInputSchema).optional()
}).strict();

export const AuctionCaseUncheckedUpdateWithoutArticlesInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedUpdateWithoutArticlesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  officialValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  area: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorLevel: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorPlan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasElevator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  completedYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bids: z.lazy(() => BidUncheckedUpdateManyWithoutAuctionCaseNestedInputSchema).optional()
}).strict();

export const AttachmentUpsertWithWhereUniqueWithoutArticleInputSchema: z.ZodType<Prisma.AttachmentUpsertWithWhereUniqueWithoutArticleInput> = z.object({
  where: z.lazy(() => AttachmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AttachmentUpdateWithoutArticleInputSchema),z.lazy(() => AttachmentUncheckedUpdateWithoutArticleInputSchema) ]),
  create: z.union([ z.lazy(() => AttachmentCreateWithoutArticleInputSchema),z.lazy(() => AttachmentUncheckedCreateWithoutArticleInputSchema) ]),
}).strict();

export const AttachmentUpdateWithWhereUniqueWithoutArticleInputSchema: z.ZodType<Prisma.AttachmentUpdateWithWhereUniqueWithoutArticleInput> = z.object({
  where: z.lazy(() => AttachmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AttachmentUpdateWithoutArticleInputSchema),z.lazy(() => AttachmentUncheckedUpdateWithoutArticleInputSchema) ]),
}).strict();

export const AttachmentUpdateManyWithWhereWithoutArticleInputSchema: z.ZodType<Prisma.AttachmentUpdateManyWithWhereWithoutArticleInput> = z.object({
  where: z.lazy(() => AttachmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AttachmentUpdateManyMutationInputSchema),z.lazy(() => AttachmentUncheckedUpdateManyWithoutArticleInputSchema) ]),
}).strict();

export const AttachmentScalarWhereInputSchema: z.ZodType<Prisma.AttachmentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AttachmentScalarWhereInputSchema),z.lazy(() => AttachmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AttachmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AttachmentScalarWhereInputSchema),z.lazy(() => AttachmentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  articleId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fileName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const LikeOnArticleUpsertWithWhereUniqueWithoutArticleInputSchema: z.ZodType<Prisma.LikeOnArticleUpsertWithWhereUniqueWithoutArticleInput> = z.object({
  where: z.lazy(() => LikeOnArticleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LikeOnArticleUpdateWithoutArticleInputSchema),z.lazy(() => LikeOnArticleUncheckedUpdateWithoutArticleInputSchema) ]),
  create: z.union([ z.lazy(() => LikeOnArticleCreateWithoutArticleInputSchema),z.lazy(() => LikeOnArticleUncheckedCreateWithoutArticleInputSchema) ]),
}).strict();

export const LikeOnArticleUpdateWithWhereUniqueWithoutArticleInputSchema: z.ZodType<Prisma.LikeOnArticleUpdateWithWhereUniqueWithoutArticleInput> = z.object({
  where: z.lazy(() => LikeOnArticleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LikeOnArticleUpdateWithoutArticleInputSchema),z.lazy(() => LikeOnArticleUncheckedUpdateWithoutArticleInputSchema) ]),
}).strict();

export const LikeOnArticleUpdateManyWithWhereWithoutArticleInputSchema: z.ZodType<Prisma.LikeOnArticleUpdateManyWithWhereWithoutArticleInput> = z.object({
  where: z.lazy(() => LikeOnArticleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LikeOnArticleUpdateManyMutationInputSchema),z.lazy(() => LikeOnArticleUncheckedUpdateManyWithoutArticleInputSchema) ]),
}).strict();

export const LikeOnArticleScalarWhereInputSchema: z.ZodType<Prisma.LikeOnArticleScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LikeOnArticleScalarWhereInputSchema),z.lazy(() => LikeOnArticleScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikeOnArticleScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikeOnArticleScalarWhereInputSchema),z.lazy(() => LikeOnArticleScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  articleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ArticleCreateWithoutLikesInputSchema: z.ZodType<Prisma.ArticleCreateWithoutLikesInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string().optional().nullable(),
  contentHtml: z.string().optional().nullable(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutArticlesInputSchema),
  auctionCase: z.lazy(() => AuctionCaseCreateNestedOneWithoutArticlesInputSchema).optional(),
  attachments: z.lazy(() => AttachmentCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export const ArticleUncheckedCreateWithoutLikesInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateWithoutLikesInput> = z.object({
  id: z.string().cuid().optional(),
  authorId: z.string(),
  auctionCaseId: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  contentHtml: z.string().optional().nullable(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  attachments: z.lazy(() => AttachmentUncheckedCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export const ArticleCreateOrConnectWithoutLikesInputSchema: z.ZodType<Prisma.ArticleCreateOrConnectWithoutLikesInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ArticleCreateWithoutLikesInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutLikesInputSchema) ]),
}).strict();

export const ArticleUpsertWithoutLikesInputSchema: z.ZodType<Prisma.ArticleUpsertWithoutLikesInput> = z.object({
  update: z.union([ z.lazy(() => ArticleUpdateWithoutLikesInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutLikesInputSchema) ]),
  create: z.union([ z.lazy(() => ArticleCreateWithoutLikesInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutLikesInputSchema) ]),
  where: z.lazy(() => ArticleWhereInputSchema).optional()
}).strict();

export const ArticleUpdateToOneWithWhereWithoutLikesInputSchema: z.ZodType<Prisma.ArticleUpdateToOneWithWhereWithoutLikesInput> = z.object({
  where: z.lazy(() => ArticleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ArticleUpdateWithoutLikesInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutLikesInputSchema) ]),
}).strict();

export const ArticleUpdateWithoutLikesInputSchema: z.ZodType<Prisma.ArticleUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contentHtml: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutArticlesNestedInputSchema).optional(),
  auctionCase: z.lazy(() => AuctionCaseUpdateOneWithoutArticlesNestedInputSchema).optional(),
  attachments: z.lazy(() => AttachmentUpdateManyWithoutArticleNestedInputSchema).optional()
}).strict();

export const ArticleUncheckedUpdateWithoutLikesInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  auctionCaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contentHtml: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  attachments: z.lazy(() => AttachmentUncheckedUpdateManyWithoutArticleNestedInputSchema).optional()
}).strict();

export const ArticleCreateWithoutAttachmentsInputSchema: z.ZodType<Prisma.ArticleCreateWithoutAttachmentsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string().optional().nullable(),
  contentHtml: z.string().optional().nullable(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutArticlesInputSchema),
  auctionCase: z.lazy(() => AuctionCaseCreateNestedOneWithoutArticlesInputSchema).optional(),
  likes: z.lazy(() => LikeOnArticleCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export const ArticleUncheckedCreateWithoutAttachmentsInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateWithoutAttachmentsInput> = z.object({
  id: z.string().cuid().optional(),
  authorId: z.string(),
  auctionCaseId: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  contentHtml: z.string().optional().nullable(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likes: z.lazy(() => LikeOnArticleUncheckedCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export const ArticleCreateOrConnectWithoutAttachmentsInputSchema: z.ZodType<Prisma.ArticleCreateOrConnectWithoutAttachmentsInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ArticleCreateWithoutAttachmentsInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAttachmentsInputSchema) ]),
}).strict();

export const ArticleUpsertWithoutAttachmentsInputSchema: z.ZodType<Prisma.ArticleUpsertWithoutAttachmentsInput> = z.object({
  update: z.union([ z.lazy(() => ArticleUpdateWithoutAttachmentsInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutAttachmentsInputSchema) ]),
  create: z.union([ z.lazy(() => ArticleCreateWithoutAttachmentsInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAttachmentsInputSchema) ]),
  where: z.lazy(() => ArticleWhereInputSchema).optional()
}).strict();

export const ArticleUpdateToOneWithWhereWithoutAttachmentsInputSchema: z.ZodType<Prisma.ArticleUpdateToOneWithWhereWithoutAttachmentsInput> = z.object({
  where: z.lazy(() => ArticleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ArticleUpdateWithoutAttachmentsInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutAttachmentsInputSchema) ]),
}).strict();

export const ArticleUpdateWithoutAttachmentsInputSchema: z.ZodType<Prisma.ArticleUpdateWithoutAttachmentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contentHtml: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutArticlesNestedInputSchema).optional(),
  auctionCase: z.lazy(() => AuctionCaseUpdateOneWithoutArticlesNestedInputSchema).optional(),
  likes: z.lazy(() => LikeOnArticleUpdateManyWithoutArticleNestedInputSchema).optional()
}).strict();

export const ArticleUncheckedUpdateWithoutAttachmentsInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateWithoutAttachmentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  auctionCaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contentHtml: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => LikeOnArticleUncheckedUpdateManyWithoutArticleNestedInputSchema).optional()
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UsersOnGroupsCreateManyUserInputSchema: z.ZodType<Prisma.UsersOnGroupsCreateManyUserInput> = z.object({
  groupId: z.string(),
  invitedBy: z.string(),
  joinedAt: z.coerce.date().optional()
}).strict();

export const BidCreateManyUserInputSchema: z.ZodType<Prisma.BidCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  auctionCaseId: z.string(),
  expectedSalePrice: z.number().int().optional(),
  acquisitionCost: z.number().int().optional(),
  evacuationCost: z.number().int().optional(),
  repairCost: z.number().int().optional(),
  brokerageFee: z.number().int().optional(),
  estimatedInterest: z.number().int().optional(),
  otherCost: z.number().int().optional(),
  expectedProfit: z.number().int().optional(),
  biddingPrice: z.number().int().optional(),
  isExcluded: z.boolean().optional(),
  excludedReason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ArticleCreateManyAuthorInputSchema: z.ZodType<Prisma.ArticleCreateManyAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  auctionCaseId: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  contentHtml: z.string().optional().nullable(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersOnGroupsUpdateWithoutUserInputSchema: z.ZodType<Prisma.UsersOnGroupsUpdateWithoutUserInput> = z.object({
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  group: z.lazy(() => GroupUpdateOneRequiredWithoutMembersNestedInputSchema).optional()
}).strict();

export const UsersOnGroupsUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedUpdateWithoutUserInput> = z.object({
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersOnGroupsUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedUpdateManyWithoutUserInput> = z.object({
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BidUpdateWithoutUserInputSchema: z.ZodType<Prisma.BidUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expectedSalePrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  acquisitionCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evacuationCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repairCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  brokerageFee: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedInterest: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  otherCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expectedProfit: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  biddingPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isExcluded: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  excludedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  auctionCase: z.lazy(() => AuctionCaseUpdateOneRequiredWithoutBidsNestedInputSchema).optional()
}).strict();

export const BidUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.BidUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  auctionCaseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expectedSalePrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  acquisitionCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evacuationCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repairCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  brokerageFee: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedInterest: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  otherCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expectedProfit: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  biddingPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isExcluded: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  excludedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BidUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.BidUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  auctionCaseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expectedSalePrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  acquisitionCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evacuationCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repairCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  brokerageFee: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedInterest: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  otherCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expectedProfit: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  biddingPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isExcluded: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  excludedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArticleUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contentHtml: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  auctionCase: z.lazy(() => AuctionCaseUpdateOneWithoutArticlesNestedInputSchema).optional(),
  attachments: z.lazy(() => AttachmentUpdateManyWithoutArticleNestedInputSchema).optional(),
  likes: z.lazy(() => LikeOnArticleUpdateManyWithoutArticleNestedInputSchema).optional()
}).strict();

export const ArticleUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  auctionCaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contentHtml: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  attachments: z.lazy(() => AttachmentUncheckedUpdateManyWithoutArticleNestedInputSchema).optional(),
  likes: z.lazy(() => LikeOnArticleUncheckedUpdateManyWithoutArticleNestedInputSchema).optional()
}).strict();

export const ArticleUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  auctionCaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contentHtml: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersOnGroupsCreateManyGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsCreateManyGroupInput> = z.object({
  userId: z.string(),
  invitedBy: z.string(),
  joinedAt: z.coerce.date().optional()
}).strict();

export const AuctionCaseCreateManyGroupInputSchema: z.ZodType<Prisma.AuctionCaseCreateManyGroupInput> = z.object({
  id: z.string().cuid().optional(),
  caseName: z.string(),
  address: z.string().optional().nullable(),
  addressDetail: z.string().optional().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  image: z.string().optional().nullable(),
  actualBidStartsAt: z.coerce.date().optional().nullable(),
  appraisedValue: z.number().int().optional(),
  startingBid: z.number().int().optional(),
  officialValue: z.number().int().optional(),
  area: z.number().optional().nullable(),
  floorLevel: z.number().int().optional().nullable(),
  floorPlan: z.string().optional().nullable(),
  hasElevator: z.boolean().optional(),
  completedYear: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UsersOnGroupsUpdateWithoutGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsUpdateWithoutGroupInput> = z.object({
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutGroupsNestedInputSchema).optional()
}).strict();

export const UsersOnGroupsUncheckedUpdateWithoutGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedUpdateWithoutGroupInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersOnGroupsUncheckedUpdateManyWithoutGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedUpdateManyWithoutGroupInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuctionCaseUpdateWithoutGroupInputSchema: z.ZodType<Prisma.AuctionCaseUpdateWithoutGroupInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  officialValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  area: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorLevel: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorPlan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasElevator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  completedYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bids: z.lazy(() => BidUpdateManyWithoutAuctionCaseNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutAuctionCaseNestedInputSchema).optional()
}).strict();

export const AuctionCaseUncheckedUpdateWithoutGroupInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedUpdateWithoutGroupInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  officialValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  area: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorLevel: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorPlan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasElevator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  completedYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bids: z.lazy(() => BidUncheckedUpdateManyWithoutAuctionCaseNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutAuctionCaseNestedInputSchema).optional()
}).strict();

export const AuctionCaseUncheckedUpdateManyWithoutGroupInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedUpdateManyWithoutGroupInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  officialValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  area: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorLevel: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  floorPlan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasElevator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  completedYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BidCreateManyAuctionCaseInputSchema: z.ZodType<Prisma.BidCreateManyAuctionCaseInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  expectedSalePrice: z.number().int().optional(),
  acquisitionCost: z.number().int().optional(),
  evacuationCost: z.number().int().optional(),
  repairCost: z.number().int().optional(),
  brokerageFee: z.number().int().optional(),
  estimatedInterest: z.number().int().optional(),
  otherCost: z.number().int().optional(),
  expectedProfit: z.number().int().optional(),
  biddingPrice: z.number().int().optional(),
  isExcluded: z.boolean().optional(),
  excludedReason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ArticleCreateManyAuctionCaseInputSchema: z.ZodType<Prisma.ArticleCreateManyAuctionCaseInput> = z.object({
  id: z.string().cuid().optional(),
  authorId: z.string(),
  title: z.string().optional().nullable(),
  contentHtml: z.string().optional().nullable(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BidUpdateWithoutAuctionCaseInputSchema: z.ZodType<Prisma.BidUpdateWithoutAuctionCaseInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expectedSalePrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  acquisitionCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evacuationCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repairCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  brokerageFee: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedInterest: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  otherCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expectedProfit: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  biddingPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isExcluded: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  excludedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBidsNestedInputSchema).optional()
}).strict();

export const BidUncheckedUpdateWithoutAuctionCaseInputSchema: z.ZodType<Prisma.BidUncheckedUpdateWithoutAuctionCaseInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expectedSalePrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  acquisitionCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evacuationCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repairCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  brokerageFee: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedInterest: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  otherCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expectedProfit: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  biddingPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isExcluded: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  excludedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BidUncheckedUpdateManyWithoutAuctionCaseInputSchema: z.ZodType<Prisma.BidUncheckedUpdateManyWithoutAuctionCaseInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expectedSalePrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  acquisitionCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  evacuationCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repairCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  brokerageFee: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedInterest: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  otherCost: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expectedProfit: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  biddingPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isExcluded: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  excludedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArticleUpdateWithoutAuctionCaseInputSchema: z.ZodType<Prisma.ArticleUpdateWithoutAuctionCaseInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contentHtml: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutArticlesNestedInputSchema).optional(),
  attachments: z.lazy(() => AttachmentUpdateManyWithoutArticleNestedInputSchema).optional(),
  likes: z.lazy(() => LikeOnArticleUpdateManyWithoutArticleNestedInputSchema).optional()
}).strict();

export const ArticleUncheckedUpdateWithoutAuctionCaseInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateWithoutAuctionCaseInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contentHtml: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  attachments: z.lazy(() => AttachmentUncheckedUpdateManyWithoutArticleNestedInputSchema).optional(),
  likes: z.lazy(() => LikeOnArticleUncheckedUpdateManyWithoutArticleNestedInputSchema).optional()
}).strict();

export const ArticleUncheckedUpdateManyWithoutAuctionCaseInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateManyWithoutAuctionCaseInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contentHtml: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AttachmentCreateManyArticleInputSchema: z.ZodType<Prisma.AttachmentCreateManyArticleInput> = z.object({
  id: z.string().cuid().optional(),
  fileName: z.string(),
  url: z.string()
}).strict();

export const LikeOnArticleCreateManyArticleInputSchema: z.ZodType<Prisma.LikeOnArticleCreateManyArticleInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AttachmentUpdateWithoutArticleInputSchema: z.ZodType<Prisma.AttachmentUpdateWithoutArticleInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AttachmentUncheckedUpdateWithoutArticleInputSchema: z.ZodType<Prisma.AttachmentUncheckedUpdateWithoutArticleInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AttachmentUncheckedUpdateManyWithoutArticleInputSchema: z.ZodType<Prisma.AttachmentUncheckedUpdateManyWithoutArticleInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeOnArticleUpdateWithoutArticleInputSchema: z.ZodType<Prisma.LikeOnArticleUpdateWithoutArticleInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeOnArticleUncheckedUpdateWithoutArticleInputSchema: z.ZodType<Prisma.LikeOnArticleUncheckedUpdateWithoutArticleInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeOnArticleUncheckedUpdateManyWithoutArticleInputSchema: z.ZodType<Prisma.LikeOnArticleUncheckedUpdateManyWithoutArticleInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const GroupFindFirstArgsSchema: z.ZodType<Prisma.GroupFindFirstArgs> = z.object({
  select: GroupSelectSchema.optional(),
  include: GroupIncludeSchema.optional(),
  where: GroupWhereInputSchema.optional(),
  orderBy: z.union([ GroupOrderByWithRelationInputSchema.array(),GroupOrderByWithRelationInputSchema ]).optional(),
  cursor: GroupWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GroupScalarFieldEnumSchema,GroupScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GroupFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GroupFindFirstOrThrowArgs> = z.object({
  select: GroupSelectSchema.optional(),
  include: GroupIncludeSchema.optional(),
  where: GroupWhereInputSchema.optional(),
  orderBy: z.union([ GroupOrderByWithRelationInputSchema.array(),GroupOrderByWithRelationInputSchema ]).optional(),
  cursor: GroupWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GroupScalarFieldEnumSchema,GroupScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GroupFindManyArgsSchema: z.ZodType<Prisma.GroupFindManyArgs> = z.object({
  select: GroupSelectSchema.optional(),
  include: GroupIncludeSchema.optional(),
  where: GroupWhereInputSchema.optional(),
  orderBy: z.union([ GroupOrderByWithRelationInputSchema.array(),GroupOrderByWithRelationInputSchema ]).optional(),
  cursor: GroupWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GroupScalarFieldEnumSchema,GroupScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GroupAggregateArgsSchema: z.ZodType<Prisma.GroupAggregateArgs> = z.object({
  where: GroupWhereInputSchema.optional(),
  orderBy: z.union([ GroupOrderByWithRelationInputSchema.array(),GroupOrderByWithRelationInputSchema ]).optional(),
  cursor: GroupWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GroupGroupByArgsSchema: z.ZodType<Prisma.GroupGroupByArgs> = z.object({
  where: GroupWhereInputSchema.optional(),
  orderBy: z.union([ GroupOrderByWithAggregationInputSchema.array(),GroupOrderByWithAggregationInputSchema ]).optional(),
  by: GroupScalarFieldEnumSchema.array(),
  having: GroupScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GroupFindUniqueArgsSchema: z.ZodType<Prisma.GroupFindUniqueArgs> = z.object({
  select: GroupSelectSchema.optional(),
  include: GroupIncludeSchema.optional(),
  where: GroupWhereUniqueInputSchema,
}).strict() ;

export const GroupFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GroupFindUniqueOrThrowArgs> = z.object({
  select: GroupSelectSchema.optional(),
  include: GroupIncludeSchema.optional(),
  where: GroupWhereUniqueInputSchema,
}).strict() ;

export const UsersOnGroupsFindFirstArgsSchema: z.ZodType<Prisma.UsersOnGroupsFindFirstArgs> = z.object({
  select: UsersOnGroupsSelectSchema.optional(),
  include: UsersOnGroupsIncludeSchema.optional(),
  where: UsersOnGroupsWhereInputSchema.optional(),
  orderBy: z.union([ UsersOnGroupsOrderByWithRelationInputSchema.array(),UsersOnGroupsOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersOnGroupsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersOnGroupsScalarFieldEnumSchema,UsersOnGroupsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UsersOnGroupsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UsersOnGroupsFindFirstOrThrowArgs> = z.object({
  select: UsersOnGroupsSelectSchema.optional(),
  include: UsersOnGroupsIncludeSchema.optional(),
  where: UsersOnGroupsWhereInputSchema.optional(),
  orderBy: z.union([ UsersOnGroupsOrderByWithRelationInputSchema.array(),UsersOnGroupsOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersOnGroupsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersOnGroupsScalarFieldEnumSchema,UsersOnGroupsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UsersOnGroupsFindManyArgsSchema: z.ZodType<Prisma.UsersOnGroupsFindManyArgs> = z.object({
  select: UsersOnGroupsSelectSchema.optional(),
  include: UsersOnGroupsIncludeSchema.optional(),
  where: UsersOnGroupsWhereInputSchema.optional(),
  orderBy: z.union([ UsersOnGroupsOrderByWithRelationInputSchema.array(),UsersOnGroupsOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersOnGroupsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersOnGroupsScalarFieldEnumSchema,UsersOnGroupsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UsersOnGroupsAggregateArgsSchema: z.ZodType<Prisma.UsersOnGroupsAggregateArgs> = z.object({
  where: UsersOnGroupsWhereInputSchema.optional(),
  orderBy: z.union([ UsersOnGroupsOrderByWithRelationInputSchema.array(),UsersOnGroupsOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersOnGroupsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UsersOnGroupsGroupByArgsSchema: z.ZodType<Prisma.UsersOnGroupsGroupByArgs> = z.object({
  where: UsersOnGroupsWhereInputSchema.optional(),
  orderBy: z.union([ UsersOnGroupsOrderByWithAggregationInputSchema.array(),UsersOnGroupsOrderByWithAggregationInputSchema ]).optional(),
  by: UsersOnGroupsScalarFieldEnumSchema.array(),
  having: UsersOnGroupsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UsersOnGroupsFindUniqueArgsSchema: z.ZodType<Prisma.UsersOnGroupsFindUniqueArgs> = z.object({
  select: UsersOnGroupsSelectSchema.optional(),
  include: UsersOnGroupsIncludeSchema.optional(),
  where: UsersOnGroupsWhereUniqueInputSchema,
}).strict() ;

export const UsersOnGroupsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UsersOnGroupsFindUniqueOrThrowArgs> = z.object({
  select: UsersOnGroupsSelectSchema.optional(),
  include: UsersOnGroupsIncludeSchema.optional(),
  where: UsersOnGroupsWhereUniqueInputSchema,
}).strict() ;

export const AuctionCaseFindFirstArgsSchema: z.ZodType<Prisma.AuctionCaseFindFirstArgs> = z.object({
  select: AuctionCaseSelectSchema.optional(),
  include: AuctionCaseIncludeSchema.optional(),
  where: AuctionCaseWhereInputSchema.optional(),
  orderBy: z.union([ AuctionCaseOrderByWithRelationInputSchema.array(),AuctionCaseOrderByWithRelationInputSchema ]).optional(),
  cursor: AuctionCaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuctionCaseScalarFieldEnumSchema,AuctionCaseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuctionCaseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AuctionCaseFindFirstOrThrowArgs> = z.object({
  select: AuctionCaseSelectSchema.optional(),
  include: AuctionCaseIncludeSchema.optional(),
  where: AuctionCaseWhereInputSchema.optional(),
  orderBy: z.union([ AuctionCaseOrderByWithRelationInputSchema.array(),AuctionCaseOrderByWithRelationInputSchema ]).optional(),
  cursor: AuctionCaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuctionCaseScalarFieldEnumSchema,AuctionCaseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuctionCaseFindManyArgsSchema: z.ZodType<Prisma.AuctionCaseFindManyArgs> = z.object({
  select: AuctionCaseSelectSchema.optional(),
  include: AuctionCaseIncludeSchema.optional(),
  where: AuctionCaseWhereInputSchema.optional(),
  orderBy: z.union([ AuctionCaseOrderByWithRelationInputSchema.array(),AuctionCaseOrderByWithRelationInputSchema ]).optional(),
  cursor: AuctionCaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuctionCaseScalarFieldEnumSchema,AuctionCaseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuctionCaseAggregateArgsSchema: z.ZodType<Prisma.AuctionCaseAggregateArgs> = z.object({
  where: AuctionCaseWhereInputSchema.optional(),
  orderBy: z.union([ AuctionCaseOrderByWithRelationInputSchema.array(),AuctionCaseOrderByWithRelationInputSchema ]).optional(),
  cursor: AuctionCaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AuctionCaseGroupByArgsSchema: z.ZodType<Prisma.AuctionCaseGroupByArgs> = z.object({
  where: AuctionCaseWhereInputSchema.optional(),
  orderBy: z.union([ AuctionCaseOrderByWithAggregationInputSchema.array(),AuctionCaseOrderByWithAggregationInputSchema ]).optional(),
  by: AuctionCaseScalarFieldEnumSchema.array(),
  having: AuctionCaseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AuctionCaseFindUniqueArgsSchema: z.ZodType<Prisma.AuctionCaseFindUniqueArgs> = z.object({
  select: AuctionCaseSelectSchema.optional(),
  include: AuctionCaseIncludeSchema.optional(),
  where: AuctionCaseWhereUniqueInputSchema,
}).strict() ;

export const AuctionCaseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AuctionCaseFindUniqueOrThrowArgs> = z.object({
  select: AuctionCaseSelectSchema.optional(),
  include: AuctionCaseIncludeSchema.optional(),
  where: AuctionCaseWhereUniqueInputSchema,
}).strict() ;

export const BidFindFirstArgsSchema: z.ZodType<Prisma.BidFindFirstArgs> = z.object({
  select: BidSelectSchema.optional(),
  include: BidIncludeSchema.optional(),
  where: BidWhereInputSchema.optional(),
  orderBy: z.union([ BidOrderByWithRelationInputSchema.array(),BidOrderByWithRelationInputSchema ]).optional(),
  cursor: BidWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BidScalarFieldEnumSchema,BidScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BidFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BidFindFirstOrThrowArgs> = z.object({
  select: BidSelectSchema.optional(),
  include: BidIncludeSchema.optional(),
  where: BidWhereInputSchema.optional(),
  orderBy: z.union([ BidOrderByWithRelationInputSchema.array(),BidOrderByWithRelationInputSchema ]).optional(),
  cursor: BidWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BidScalarFieldEnumSchema,BidScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BidFindManyArgsSchema: z.ZodType<Prisma.BidFindManyArgs> = z.object({
  select: BidSelectSchema.optional(),
  include: BidIncludeSchema.optional(),
  where: BidWhereInputSchema.optional(),
  orderBy: z.union([ BidOrderByWithRelationInputSchema.array(),BidOrderByWithRelationInputSchema ]).optional(),
  cursor: BidWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BidScalarFieldEnumSchema,BidScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BidAggregateArgsSchema: z.ZodType<Prisma.BidAggregateArgs> = z.object({
  where: BidWhereInputSchema.optional(),
  orderBy: z.union([ BidOrderByWithRelationInputSchema.array(),BidOrderByWithRelationInputSchema ]).optional(),
  cursor: BidWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BidGroupByArgsSchema: z.ZodType<Prisma.BidGroupByArgs> = z.object({
  where: BidWhereInputSchema.optional(),
  orderBy: z.union([ BidOrderByWithAggregationInputSchema.array(),BidOrderByWithAggregationInputSchema ]).optional(),
  by: BidScalarFieldEnumSchema.array(),
  having: BidScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BidFindUniqueArgsSchema: z.ZodType<Prisma.BidFindUniqueArgs> = z.object({
  select: BidSelectSchema.optional(),
  include: BidIncludeSchema.optional(),
  where: BidWhereUniqueInputSchema,
}).strict() ;

export const BidFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BidFindUniqueOrThrowArgs> = z.object({
  select: BidSelectSchema.optional(),
  include: BidIncludeSchema.optional(),
  where: BidWhereUniqueInputSchema,
}).strict() ;

export const ArticleFindFirstArgsSchema: z.ZodType<Prisma.ArticleFindFirstArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithRelationInputSchema.array(),ArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: ArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArticleScalarFieldEnumSchema,ArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ArticleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ArticleFindFirstOrThrowArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithRelationInputSchema.array(),ArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: ArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArticleScalarFieldEnumSchema,ArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ArticleFindManyArgsSchema: z.ZodType<Prisma.ArticleFindManyArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithRelationInputSchema.array(),ArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: ArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArticleScalarFieldEnumSchema,ArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ArticleAggregateArgsSchema: z.ZodType<Prisma.ArticleAggregateArgs> = z.object({
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithRelationInputSchema.array(),ArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: ArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ArticleGroupByArgsSchema: z.ZodType<Prisma.ArticleGroupByArgs> = z.object({
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithAggregationInputSchema.array(),ArticleOrderByWithAggregationInputSchema ]).optional(),
  by: ArticleScalarFieldEnumSchema.array(),
  having: ArticleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ArticleFindUniqueArgsSchema: z.ZodType<Prisma.ArticleFindUniqueArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereUniqueInputSchema,
}).strict() ;

export const ArticleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ArticleFindUniqueOrThrowArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereUniqueInputSchema,
}).strict() ;

export const LikeOnArticleFindFirstArgsSchema: z.ZodType<Prisma.LikeOnArticleFindFirstArgs> = z.object({
  select: LikeOnArticleSelectSchema.optional(),
  include: LikeOnArticleIncludeSchema.optional(),
  where: LikeOnArticleWhereInputSchema.optional(),
  orderBy: z.union([ LikeOnArticleOrderByWithRelationInputSchema.array(),LikeOnArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: LikeOnArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LikeOnArticleScalarFieldEnumSchema,LikeOnArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LikeOnArticleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LikeOnArticleFindFirstOrThrowArgs> = z.object({
  select: LikeOnArticleSelectSchema.optional(),
  include: LikeOnArticleIncludeSchema.optional(),
  where: LikeOnArticleWhereInputSchema.optional(),
  orderBy: z.union([ LikeOnArticleOrderByWithRelationInputSchema.array(),LikeOnArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: LikeOnArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LikeOnArticleScalarFieldEnumSchema,LikeOnArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LikeOnArticleFindManyArgsSchema: z.ZodType<Prisma.LikeOnArticleFindManyArgs> = z.object({
  select: LikeOnArticleSelectSchema.optional(),
  include: LikeOnArticleIncludeSchema.optional(),
  where: LikeOnArticleWhereInputSchema.optional(),
  orderBy: z.union([ LikeOnArticleOrderByWithRelationInputSchema.array(),LikeOnArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: LikeOnArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LikeOnArticleScalarFieldEnumSchema,LikeOnArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LikeOnArticleAggregateArgsSchema: z.ZodType<Prisma.LikeOnArticleAggregateArgs> = z.object({
  where: LikeOnArticleWhereInputSchema.optional(),
  orderBy: z.union([ LikeOnArticleOrderByWithRelationInputSchema.array(),LikeOnArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: LikeOnArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LikeOnArticleGroupByArgsSchema: z.ZodType<Prisma.LikeOnArticleGroupByArgs> = z.object({
  where: LikeOnArticleWhereInputSchema.optional(),
  orderBy: z.union([ LikeOnArticleOrderByWithAggregationInputSchema.array(),LikeOnArticleOrderByWithAggregationInputSchema ]).optional(),
  by: LikeOnArticleScalarFieldEnumSchema.array(),
  having: LikeOnArticleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LikeOnArticleFindUniqueArgsSchema: z.ZodType<Prisma.LikeOnArticleFindUniqueArgs> = z.object({
  select: LikeOnArticleSelectSchema.optional(),
  include: LikeOnArticleIncludeSchema.optional(),
  where: LikeOnArticleWhereUniqueInputSchema,
}).strict() ;

export const LikeOnArticleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LikeOnArticleFindUniqueOrThrowArgs> = z.object({
  select: LikeOnArticleSelectSchema.optional(),
  include: LikeOnArticleIncludeSchema.optional(),
  where: LikeOnArticleWhereUniqueInputSchema,
}).strict() ;

export const AttachmentFindFirstArgsSchema: z.ZodType<Prisma.AttachmentFindFirstArgs> = z.object({
  select: AttachmentSelectSchema.optional(),
  include: AttachmentIncludeSchema.optional(),
  where: AttachmentWhereInputSchema.optional(),
  orderBy: z.union([ AttachmentOrderByWithRelationInputSchema.array(),AttachmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AttachmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AttachmentScalarFieldEnumSchema,AttachmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AttachmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AttachmentFindFirstOrThrowArgs> = z.object({
  select: AttachmentSelectSchema.optional(),
  include: AttachmentIncludeSchema.optional(),
  where: AttachmentWhereInputSchema.optional(),
  orderBy: z.union([ AttachmentOrderByWithRelationInputSchema.array(),AttachmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AttachmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AttachmentScalarFieldEnumSchema,AttachmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AttachmentFindManyArgsSchema: z.ZodType<Prisma.AttachmentFindManyArgs> = z.object({
  select: AttachmentSelectSchema.optional(),
  include: AttachmentIncludeSchema.optional(),
  where: AttachmentWhereInputSchema.optional(),
  orderBy: z.union([ AttachmentOrderByWithRelationInputSchema.array(),AttachmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AttachmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AttachmentScalarFieldEnumSchema,AttachmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AttachmentAggregateArgsSchema: z.ZodType<Prisma.AttachmentAggregateArgs> = z.object({
  where: AttachmentWhereInputSchema.optional(),
  orderBy: z.union([ AttachmentOrderByWithRelationInputSchema.array(),AttachmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AttachmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AttachmentGroupByArgsSchema: z.ZodType<Prisma.AttachmentGroupByArgs> = z.object({
  where: AttachmentWhereInputSchema.optional(),
  orderBy: z.union([ AttachmentOrderByWithAggregationInputSchema.array(),AttachmentOrderByWithAggregationInputSchema ]).optional(),
  by: AttachmentScalarFieldEnumSchema.array(),
  having: AttachmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AttachmentFindUniqueArgsSchema: z.ZodType<Prisma.AttachmentFindUniqueArgs> = z.object({
  select: AttachmentSelectSchema.optional(),
  include: AttachmentIncludeSchema.optional(),
  where: AttachmentWhereUniqueInputSchema,
}).strict() ;

export const AttachmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AttachmentFindUniqueOrThrowArgs> = z.object({
  select: AttachmentSelectSchema.optional(),
  include: AttachmentIncludeSchema.optional(),
  where: AttachmentWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const GroupCreateArgsSchema: z.ZodType<Prisma.GroupCreateArgs> = z.object({
  select: GroupSelectSchema.optional(),
  include: GroupIncludeSchema.optional(),
  data: z.union([ GroupCreateInputSchema,GroupUncheckedCreateInputSchema ]),
}).strict() ;

export const GroupUpsertArgsSchema: z.ZodType<Prisma.GroupUpsertArgs> = z.object({
  select: GroupSelectSchema.optional(),
  include: GroupIncludeSchema.optional(),
  where: GroupWhereUniqueInputSchema,
  create: z.union([ GroupCreateInputSchema,GroupUncheckedCreateInputSchema ]),
  update: z.union([ GroupUpdateInputSchema,GroupUncheckedUpdateInputSchema ]),
}).strict() ;

export const GroupCreateManyArgsSchema: z.ZodType<Prisma.GroupCreateManyArgs> = z.object({
  data: z.union([ GroupCreateManyInputSchema,GroupCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const GroupCreateManyAndReturnArgsSchema: z.ZodType<Prisma.GroupCreateManyAndReturnArgs> = z.object({
  data: z.union([ GroupCreateManyInputSchema,GroupCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const GroupDeleteArgsSchema: z.ZodType<Prisma.GroupDeleteArgs> = z.object({
  select: GroupSelectSchema.optional(),
  include: GroupIncludeSchema.optional(),
  where: GroupWhereUniqueInputSchema,
}).strict() ;

export const GroupUpdateArgsSchema: z.ZodType<Prisma.GroupUpdateArgs> = z.object({
  select: GroupSelectSchema.optional(),
  include: GroupIncludeSchema.optional(),
  data: z.union([ GroupUpdateInputSchema,GroupUncheckedUpdateInputSchema ]),
  where: GroupWhereUniqueInputSchema,
}).strict() ;

export const GroupUpdateManyArgsSchema: z.ZodType<Prisma.GroupUpdateManyArgs> = z.object({
  data: z.union([ GroupUpdateManyMutationInputSchema,GroupUncheckedUpdateManyInputSchema ]),
  where: GroupWhereInputSchema.optional(),
}).strict() ;

export const GroupDeleteManyArgsSchema: z.ZodType<Prisma.GroupDeleteManyArgs> = z.object({
  where: GroupWhereInputSchema.optional(),
}).strict() ;

export const UsersOnGroupsCreateArgsSchema: z.ZodType<Prisma.UsersOnGroupsCreateArgs> = z.object({
  select: UsersOnGroupsSelectSchema.optional(),
  include: UsersOnGroupsIncludeSchema.optional(),
  data: z.union([ UsersOnGroupsCreateInputSchema,UsersOnGroupsUncheckedCreateInputSchema ]),
}).strict() ;

export const UsersOnGroupsUpsertArgsSchema: z.ZodType<Prisma.UsersOnGroupsUpsertArgs> = z.object({
  select: UsersOnGroupsSelectSchema.optional(),
  include: UsersOnGroupsIncludeSchema.optional(),
  where: UsersOnGroupsWhereUniqueInputSchema,
  create: z.union([ UsersOnGroupsCreateInputSchema,UsersOnGroupsUncheckedCreateInputSchema ]),
  update: z.union([ UsersOnGroupsUpdateInputSchema,UsersOnGroupsUncheckedUpdateInputSchema ]),
}).strict() ;

export const UsersOnGroupsCreateManyArgsSchema: z.ZodType<Prisma.UsersOnGroupsCreateManyArgs> = z.object({
  data: z.union([ UsersOnGroupsCreateManyInputSchema,UsersOnGroupsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UsersOnGroupsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UsersOnGroupsCreateManyAndReturnArgs> = z.object({
  data: z.union([ UsersOnGroupsCreateManyInputSchema,UsersOnGroupsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UsersOnGroupsDeleteArgsSchema: z.ZodType<Prisma.UsersOnGroupsDeleteArgs> = z.object({
  select: UsersOnGroupsSelectSchema.optional(),
  include: UsersOnGroupsIncludeSchema.optional(),
  where: UsersOnGroupsWhereUniqueInputSchema,
}).strict() ;

export const UsersOnGroupsUpdateArgsSchema: z.ZodType<Prisma.UsersOnGroupsUpdateArgs> = z.object({
  select: UsersOnGroupsSelectSchema.optional(),
  include: UsersOnGroupsIncludeSchema.optional(),
  data: z.union([ UsersOnGroupsUpdateInputSchema,UsersOnGroupsUncheckedUpdateInputSchema ]),
  where: UsersOnGroupsWhereUniqueInputSchema,
}).strict() ;

export const UsersOnGroupsUpdateManyArgsSchema: z.ZodType<Prisma.UsersOnGroupsUpdateManyArgs> = z.object({
  data: z.union([ UsersOnGroupsUpdateManyMutationInputSchema,UsersOnGroupsUncheckedUpdateManyInputSchema ]),
  where: UsersOnGroupsWhereInputSchema.optional(),
}).strict() ;

export const UsersOnGroupsDeleteManyArgsSchema: z.ZodType<Prisma.UsersOnGroupsDeleteManyArgs> = z.object({
  where: UsersOnGroupsWhereInputSchema.optional(),
}).strict() ;

export const AuctionCaseCreateArgsSchema: z.ZodType<Prisma.AuctionCaseCreateArgs> = z.object({
  select: AuctionCaseSelectSchema.optional(),
  include: AuctionCaseIncludeSchema.optional(),
  data: z.union([ AuctionCaseCreateInputSchema,AuctionCaseUncheckedCreateInputSchema ]),
}).strict() ;

export const AuctionCaseUpsertArgsSchema: z.ZodType<Prisma.AuctionCaseUpsertArgs> = z.object({
  select: AuctionCaseSelectSchema.optional(),
  include: AuctionCaseIncludeSchema.optional(),
  where: AuctionCaseWhereUniqueInputSchema,
  create: z.union([ AuctionCaseCreateInputSchema,AuctionCaseUncheckedCreateInputSchema ]),
  update: z.union([ AuctionCaseUpdateInputSchema,AuctionCaseUncheckedUpdateInputSchema ]),
}).strict() ;

export const AuctionCaseCreateManyArgsSchema: z.ZodType<Prisma.AuctionCaseCreateManyArgs> = z.object({
  data: z.union([ AuctionCaseCreateManyInputSchema,AuctionCaseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AuctionCaseCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AuctionCaseCreateManyAndReturnArgs> = z.object({
  data: z.union([ AuctionCaseCreateManyInputSchema,AuctionCaseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AuctionCaseDeleteArgsSchema: z.ZodType<Prisma.AuctionCaseDeleteArgs> = z.object({
  select: AuctionCaseSelectSchema.optional(),
  include: AuctionCaseIncludeSchema.optional(),
  where: AuctionCaseWhereUniqueInputSchema,
}).strict() ;

export const AuctionCaseUpdateArgsSchema: z.ZodType<Prisma.AuctionCaseUpdateArgs> = z.object({
  select: AuctionCaseSelectSchema.optional(),
  include: AuctionCaseIncludeSchema.optional(),
  data: z.union([ AuctionCaseUpdateInputSchema,AuctionCaseUncheckedUpdateInputSchema ]),
  where: AuctionCaseWhereUniqueInputSchema,
}).strict() ;

export const AuctionCaseUpdateManyArgsSchema: z.ZodType<Prisma.AuctionCaseUpdateManyArgs> = z.object({
  data: z.union([ AuctionCaseUpdateManyMutationInputSchema,AuctionCaseUncheckedUpdateManyInputSchema ]),
  where: AuctionCaseWhereInputSchema.optional(),
}).strict() ;

export const AuctionCaseDeleteManyArgsSchema: z.ZodType<Prisma.AuctionCaseDeleteManyArgs> = z.object({
  where: AuctionCaseWhereInputSchema.optional(),
}).strict() ;

export const BidCreateArgsSchema: z.ZodType<Prisma.BidCreateArgs> = z.object({
  select: BidSelectSchema.optional(),
  include: BidIncludeSchema.optional(),
  data: z.union([ BidCreateInputSchema,BidUncheckedCreateInputSchema ]),
}).strict() ;

export const BidUpsertArgsSchema: z.ZodType<Prisma.BidUpsertArgs> = z.object({
  select: BidSelectSchema.optional(),
  include: BidIncludeSchema.optional(),
  where: BidWhereUniqueInputSchema,
  create: z.union([ BidCreateInputSchema,BidUncheckedCreateInputSchema ]),
  update: z.union([ BidUpdateInputSchema,BidUncheckedUpdateInputSchema ]),
}).strict() ;

export const BidCreateManyArgsSchema: z.ZodType<Prisma.BidCreateManyArgs> = z.object({
  data: z.union([ BidCreateManyInputSchema,BidCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BidCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BidCreateManyAndReturnArgs> = z.object({
  data: z.union([ BidCreateManyInputSchema,BidCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BidDeleteArgsSchema: z.ZodType<Prisma.BidDeleteArgs> = z.object({
  select: BidSelectSchema.optional(),
  include: BidIncludeSchema.optional(),
  where: BidWhereUniqueInputSchema,
}).strict() ;

export const BidUpdateArgsSchema: z.ZodType<Prisma.BidUpdateArgs> = z.object({
  select: BidSelectSchema.optional(),
  include: BidIncludeSchema.optional(),
  data: z.union([ BidUpdateInputSchema,BidUncheckedUpdateInputSchema ]),
  where: BidWhereUniqueInputSchema,
}).strict() ;

export const BidUpdateManyArgsSchema: z.ZodType<Prisma.BidUpdateManyArgs> = z.object({
  data: z.union([ BidUpdateManyMutationInputSchema,BidUncheckedUpdateManyInputSchema ]),
  where: BidWhereInputSchema.optional(),
}).strict() ;

export const BidDeleteManyArgsSchema: z.ZodType<Prisma.BidDeleteManyArgs> = z.object({
  where: BidWhereInputSchema.optional(),
}).strict() ;

export const ArticleCreateArgsSchema: z.ZodType<Prisma.ArticleCreateArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  data: z.union([ ArticleCreateInputSchema,ArticleUncheckedCreateInputSchema ]),
}).strict() ;

export const ArticleUpsertArgsSchema: z.ZodType<Prisma.ArticleUpsertArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereUniqueInputSchema,
  create: z.union([ ArticleCreateInputSchema,ArticleUncheckedCreateInputSchema ]),
  update: z.union([ ArticleUpdateInputSchema,ArticleUncheckedUpdateInputSchema ]),
}).strict() ;

export const ArticleCreateManyArgsSchema: z.ZodType<Prisma.ArticleCreateManyArgs> = z.object({
  data: z.union([ ArticleCreateManyInputSchema,ArticleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ArticleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ArticleCreateManyAndReturnArgs> = z.object({
  data: z.union([ ArticleCreateManyInputSchema,ArticleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ArticleDeleteArgsSchema: z.ZodType<Prisma.ArticleDeleteArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereUniqueInputSchema,
}).strict() ;

export const ArticleUpdateArgsSchema: z.ZodType<Prisma.ArticleUpdateArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  data: z.union([ ArticleUpdateInputSchema,ArticleUncheckedUpdateInputSchema ]),
  where: ArticleWhereUniqueInputSchema,
}).strict() ;

export const ArticleUpdateManyArgsSchema: z.ZodType<Prisma.ArticleUpdateManyArgs> = z.object({
  data: z.union([ ArticleUpdateManyMutationInputSchema,ArticleUncheckedUpdateManyInputSchema ]),
  where: ArticleWhereInputSchema.optional(),
}).strict() ;

export const ArticleDeleteManyArgsSchema: z.ZodType<Prisma.ArticleDeleteManyArgs> = z.object({
  where: ArticleWhereInputSchema.optional(),
}).strict() ;

export const LikeOnArticleCreateArgsSchema: z.ZodType<Prisma.LikeOnArticleCreateArgs> = z.object({
  select: LikeOnArticleSelectSchema.optional(),
  include: LikeOnArticleIncludeSchema.optional(),
  data: z.union([ LikeOnArticleCreateInputSchema,LikeOnArticleUncheckedCreateInputSchema ]),
}).strict() ;

export const LikeOnArticleUpsertArgsSchema: z.ZodType<Prisma.LikeOnArticleUpsertArgs> = z.object({
  select: LikeOnArticleSelectSchema.optional(),
  include: LikeOnArticleIncludeSchema.optional(),
  where: LikeOnArticleWhereUniqueInputSchema,
  create: z.union([ LikeOnArticleCreateInputSchema,LikeOnArticleUncheckedCreateInputSchema ]),
  update: z.union([ LikeOnArticleUpdateInputSchema,LikeOnArticleUncheckedUpdateInputSchema ]),
}).strict() ;

export const LikeOnArticleCreateManyArgsSchema: z.ZodType<Prisma.LikeOnArticleCreateManyArgs> = z.object({
  data: z.union([ LikeOnArticleCreateManyInputSchema,LikeOnArticleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LikeOnArticleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.LikeOnArticleCreateManyAndReturnArgs> = z.object({
  data: z.union([ LikeOnArticleCreateManyInputSchema,LikeOnArticleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LikeOnArticleDeleteArgsSchema: z.ZodType<Prisma.LikeOnArticleDeleteArgs> = z.object({
  select: LikeOnArticleSelectSchema.optional(),
  include: LikeOnArticleIncludeSchema.optional(),
  where: LikeOnArticleWhereUniqueInputSchema,
}).strict() ;

export const LikeOnArticleUpdateArgsSchema: z.ZodType<Prisma.LikeOnArticleUpdateArgs> = z.object({
  select: LikeOnArticleSelectSchema.optional(),
  include: LikeOnArticleIncludeSchema.optional(),
  data: z.union([ LikeOnArticleUpdateInputSchema,LikeOnArticleUncheckedUpdateInputSchema ]),
  where: LikeOnArticleWhereUniqueInputSchema,
}).strict() ;

export const LikeOnArticleUpdateManyArgsSchema: z.ZodType<Prisma.LikeOnArticleUpdateManyArgs> = z.object({
  data: z.union([ LikeOnArticleUpdateManyMutationInputSchema,LikeOnArticleUncheckedUpdateManyInputSchema ]),
  where: LikeOnArticleWhereInputSchema.optional(),
}).strict() ;

export const LikeOnArticleDeleteManyArgsSchema: z.ZodType<Prisma.LikeOnArticleDeleteManyArgs> = z.object({
  where: LikeOnArticleWhereInputSchema.optional(),
}).strict() ;

export const AttachmentCreateArgsSchema: z.ZodType<Prisma.AttachmentCreateArgs> = z.object({
  select: AttachmentSelectSchema.optional(),
  include: AttachmentIncludeSchema.optional(),
  data: z.union([ AttachmentCreateInputSchema,AttachmentUncheckedCreateInputSchema ]),
}).strict() ;

export const AttachmentUpsertArgsSchema: z.ZodType<Prisma.AttachmentUpsertArgs> = z.object({
  select: AttachmentSelectSchema.optional(),
  include: AttachmentIncludeSchema.optional(),
  where: AttachmentWhereUniqueInputSchema,
  create: z.union([ AttachmentCreateInputSchema,AttachmentUncheckedCreateInputSchema ]),
  update: z.union([ AttachmentUpdateInputSchema,AttachmentUncheckedUpdateInputSchema ]),
}).strict() ;

export const AttachmentCreateManyArgsSchema: z.ZodType<Prisma.AttachmentCreateManyArgs> = z.object({
  data: z.union([ AttachmentCreateManyInputSchema,AttachmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AttachmentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AttachmentCreateManyAndReturnArgs> = z.object({
  data: z.union([ AttachmentCreateManyInputSchema,AttachmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AttachmentDeleteArgsSchema: z.ZodType<Prisma.AttachmentDeleteArgs> = z.object({
  select: AttachmentSelectSchema.optional(),
  include: AttachmentIncludeSchema.optional(),
  where: AttachmentWhereUniqueInputSchema,
}).strict() ;

export const AttachmentUpdateArgsSchema: z.ZodType<Prisma.AttachmentUpdateArgs> = z.object({
  select: AttachmentSelectSchema.optional(),
  include: AttachmentIncludeSchema.optional(),
  data: z.union([ AttachmentUpdateInputSchema,AttachmentUncheckedUpdateInputSchema ]),
  where: AttachmentWhereUniqueInputSchema,
}).strict() ;

export const AttachmentUpdateManyArgsSchema: z.ZodType<Prisma.AttachmentUpdateManyArgs> = z.object({
  data: z.union([ AttachmentUpdateManyMutationInputSchema,AttachmentUncheckedUpdateManyInputSchema ]),
  where: AttachmentWhereInputSchema.optional(),
}).strict() ;

export const AttachmentDeleteManyArgsSchema: z.ZodType<Prisma.AttachmentDeleteManyArgs> = z.object({
  where: AttachmentWhereInputSchema.optional(),
}).strict() ;