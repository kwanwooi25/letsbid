import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','password','image','createdAt','updatedAt']);

export const AccountScalarFieldEnumSchema = z.enum(['userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state','createdAt','updatedAt']);

export const SessionScalarFieldEnumSchema = z.enum(['sessionToken','userId','expires','createdAt','updatedAt']);

export const GroupScalarFieldEnumSchema = z.enum(['id','name','description','hostId','isPrivate','password','maxMembers','createdAt','updatedAt']);

export const UsersOnGroupsScalarFieldEnumSchema = z.enum(['userId','groupId','invitedBy','joinedAt']);

export const InvitationScalarFieldEnumSchema = z.enum(['id','groupId','inviterId','inviteeEmail','status']);

export const AuctionCaseScalarFieldEnumSchema = z.enum(['id','groupId','caseName','address','addressDetail','bidStartsAt','bidEndsAt','actualBidStartsAt','appraisedValue','startingBid','image']);

export const BidScalarFieldEnumSchema = z.enum(['id','auctionCaseId','userId','expectedSalePrice','acquisitionCost','evacuationCost','repairCost','brokerageFee','estimatedInterest','otherCost','expectedProfit','biddingPrice','isExcluded','excludedReason']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const UserOrderByRelevanceFieldEnumSchema = z.enum(['id','name','email','password','image']);

export const AccountOrderByRelevanceFieldEnumSchema = z.enum(['userId','type','provider','providerAccountId','refresh_token','access_token','token_type','scope','id_token','session_state']);

export const SessionOrderByRelevanceFieldEnumSchema = z.enum(['sessionToken','userId']);

export const GroupOrderByRelevanceFieldEnumSchema = z.enum(['id','name','description','hostId','password']);

export const UsersOnGroupsOrderByRelevanceFieldEnumSchema = z.enum(['userId','groupId','invitedBy']);

export const InvitationOrderByRelevanceFieldEnumSchema = z.enum(['id','groupId','inviterId','inviteeEmail']);

export const AuctionCaseOrderByRelevanceFieldEnumSchema = z.enum(['id','groupId','caseName','address','addressDetail','image']);

export const BidOrderByRelevanceFieldEnumSchema = z.enum(['id','auctionCaseId','userId','excludedReason']);

export const InvitationStatusSchema = z.enum(['PENDING','ACCEPTED','REJECTED']);

export type InvitationStatusType = `${z.infer<typeof InvitationStatusSchema>}`

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
// INVITATION SCHEMA
/////////////////////////////////////////

export const InvitationSchema = z.object({
  status: InvitationStatusSchema,
  id: z.string().cuid(),
  groupId: z.string(),
  inviterId: z.string(),
  inviteeEmail: z.string(),
})

export type Invitation = z.infer<typeof InvitationSchema>

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
  actualBidStartsAt: z.coerce.date(),
  appraisedValue: z.number().int(),
  startingBid: z.number().int(),
  image: z.string().nullable(),
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
})

export type Bid = z.infer<typeof BidSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  Account: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  Session: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  groups: z.union([z.boolean(),z.lazy(() => UsersOnGroupsFindManyArgsSchema)]).optional(),
  invitations: z.union([z.boolean(),z.lazy(() => InvitationFindManyArgsSchema)]).optional(),
  bids: z.union([z.boolean(),z.lazy(() => BidFindManyArgsSchema)]).optional(),
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
  invitations: z.boolean().optional(),
  bids: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  password: z.boolean().optional(),
  image: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Account: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  Session: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  groups: z.union([z.boolean(),z.lazy(() => UsersOnGroupsFindManyArgsSchema)]).optional(),
  invitations: z.union([z.boolean(),z.lazy(() => InvitationFindManyArgsSchema)]).optional(),
  bids: z.union([z.boolean(),z.lazy(() => BidFindManyArgsSchema)]).optional(),
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
  invitations: z.union([z.boolean(),z.lazy(() => InvitationFindManyArgsSchema)]).optional(),
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
  invitations: z.boolean().optional(),
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
  members: z.union([z.boolean(),z.lazy(() => UsersOnGroupsFindManyArgsSchema)]).optional(),
  invitations: z.union([z.boolean(),z.lazy(() => InvitationFindManyArgsSchema)]).optional(),
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

// INVITATION
//------------------------------------------------------

export const InvitationIncludeSchema: z.ZodType<Prisma.InvitationInclude> = z.object({
  group: z.union([z.boolean(),z.lazy(() => GroupArgsSchema)]).optional(),
  inviter: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const InvitationArgsSchema: z.ZodType<Prisma.InvitationDefaultArgs> = z.object({
  select: z.lazy(() => InvitationSelectSchema).optional(),
  include: z.lazy(() => InvitationIncludeSchema).optional(),
}).strict();

export const InvitationSelectSchema: z.ZodType<Prisma.InvitationSelect> = z.object({
  id: z.boolean().optional(),
  groupId: z.boolean().optional(),
  inviterId: z.boolean().optional(),
  inviteeEmail: z.boolean().optional(),
  status: z.boolean().optional(),
  group: z.union([z.boolean(),z.lazy(() => GroupArgsSchema)]).optional(),
  inviter: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// AUCTION CASE
//------------------------------------------------------

export const AuctionCaseIncludeSchema: z.ZodType<Prisma.AuctionCaseInclude> = z.object({
  group: z.union([z.boolean(),z.lazy(() => GroupArgsSchema)]).optional(),
  bids: z.union([z.boolean(),z.lazy(() => BidFindManyArgsSchema)]).optional(),
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
}).strict();

export const AuctionCaseSelectSchema: z.ZodType<Prisma.AuctionCaseSelect> = z.object({
  id: z.boolean().optional(),
  groupId: z.boolean().optional(),
  caseName: z.boolean().optional(),
  address: z.boolean().optional(),
  addressDetail: z.boolean().optional(),
  bidStartsAt: z.boolean().optional(),
  bidEndsAt: z.boolean().optional(),
  actualBidStartsAt: z.boolean().optional(),
  appraisedValue: z.boolean().optional(),
  startingBid: z.boolean().optional(),
  image: z.boolean().optional(),
  group: z.union([z.boolean(),z.lazy(() => GroupArgsSchema)]).optional(),
  bids: z.union([z.boolean(),z.lazy(() => BidFindManyArgsSchema)]).optional(),
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
  auctionCase: z.union([z.boolean(),z.lazy(() => AuctionCaseArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
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
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Account: z.lazy(() => AccountListRelationFilterSchema).optional(),
  Session: z.lazy(() => SessionListRelationFilterSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsListRelationFilterSchema).optional(),
  invitations: z.lazy(() => InvitationListRelationFilterSchema).optional(),
  bids: z.lazy(() => BidListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Account: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  Session: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsOrderByRelationAggregateInputSchema).optional(),
  invitations: z.lazy(() => InvitationOrderByRelationAggregateInputSchema).optional(),
  bids: z.lazy(() => BidOrderByRelationAggregateInputSchema).optional(),
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
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Account: z.lazy(() => AccountListRelationFilterSchema).optional(),
  Session: z.lazy(() => SessionListRelationFilterSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsListRelationFilterSchema).optional(),
  invitations: z.lazy(() => InvitationListRelationFilterSchema).optional(),
  bids: z.lazy(() => BidListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
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
  members: z.lazy(() => UsersOnGroupsListRelationFilterSchema).optional(),
  invitations: z.lazy(() => InvitationListRelationFilterSchema).optional(),
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
  members: z.lazy(() => UsersOnGroupsOrderByRelationAggregateInputSchema).optional(),
  invitations: z.lazy(() => InvitationOrderByRelationAggregateInputSchema).optional(),
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
  members: z.lazy(() => UsersOnGroupsListRelationFilterSchema).optional(),
  invitations: z.lazy(() => InvitationListRelationFilterSchema).optional(),
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

export const InvitationWhereInputSchema: z.ZodType<Prisma.InvitationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvitationWhereInputSchema),z.lazy(() => InvitationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationWhereInputSchema),z.lazy(() => InvitationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  groupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inviterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inviteeEmail: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumInvitationStatusFilterSchema),z.lazy(() => InvitationStatusSchema) ]).optional(),
  group: z.union([ z.lazy(() => GroupRelationFilterSchema),z.lazy(() => GroupWhereInputSchema) ]).optional(),
  inviter: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const InvitationOrderByWithRelationInputSchema: z.ZodType<Prisma.InvitationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  inviterId: z.lazy(() => SortOrderSchema).optional(),
  inviteeEmail: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  group: z.lazy(() => GroupOrderByWithRelationInputSchema).optional(),
  inviter: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => InvitationOrderByRelevanceInputSchema).optional()
}).strict();

export const InvitationWhereUniqueInputSchema: z.ZodType<Prisma.InvitationWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => InvitationWhereInputSchema),z.lazy(() => InvitationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationWhereInputSchema),z.lazy(() => InvitationWhereInputSchema).array() ]).optional(),
  groupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inviterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inviteeEmail: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumInvitationStatusFilterSchema),z.lazy(() => InvitationStatusSchema) ]).optional(),
  group: z.union([ z.lazy(() => GroupRelationFilterSchema),z.lazy(() => GroupWhereInputSchema) ]).optional(),
  inviter: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const InvitationOrderByWithAggregationInputSchema: z.ZodType<Prisma.InvitationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  inviterId: z.lazy(() => SortOrderSchema).optional(),
  inviteeEmail: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => InvitationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InvitationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InvitationMinOrderByAggregateInputSchema).optional()
}).strict();

export const InvitationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InvitationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => InvitationScalarWhereWithAggregatesInputSchema),z.lazy(() => InvitationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationScalarWhereWithAggregatesInputSchema),z.lazy(() => InvitationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  groupId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  inviterId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  inviteeEmail: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumInvitationStatusWithAggregatesFilterSchema),z.lazy(() => InvitationStatusSchema) ]).optional(),
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
  actualBidStartsAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  appraisedValue: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  startingBid: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  group: z.union([ z.lazy(() => GroupRelationFilterSchema),z.lazy(() => GroupWhereInputSchema) ]).optional(),
  bids: z.lazy(() => BidListRelationFilterSchema).optional()
}).strict();

export const AuctionCaseOrderByWithRelationInputSchema: z.ZodType<Prisma.AuctionCaseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  caseName: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  addressDetail: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  bidEndsAt: z.lazy(() => SortOrderSchema).optional(),
  actualBidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  appraisedValue: z.lazy(() => SortOrderSchema).optional(),
  startingBid: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  group: z.lazy(() => GroupOrderByWithRelationInputSchema).optional(),
  bids: z.lazy(() => BidOrderByRelationAggregateInputSchema).optional(),
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
  actualBidStartsAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  appraisedValue: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  startingBid: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  group: z.union([ z.lazy(() => GroupRelationFilterSchema),z.lazy(() => GroupWhereInputSchema) ]).optional(),
  bids: z.lazy(() => BidListRelationFilterSchema).optional()
}).strict());

export const AuctionCaseOrderByWithAggregationInputSchema: z.ZodType<Prisma.AuctionCaseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  caseName: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  addressDetail: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  bidEndsAt: z.lazy(() => SortOrderSchema).optional(),
  actualBidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  appraisedValue: z.lazy(() => SortOrderSchema).optional(),
  startingBid: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  actualBidStartsAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  appraisedValue: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  startingBid: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
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
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutInviterInputSchema).optional(),
  bids: z.lazy(() => BidCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutInviterInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutInviterNestedInputSchema).optional(),
  bids: z.lazy(() => BidUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutInviterNestedInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
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
  members: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutGroupInputSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutGroupInputSchema).optional(),
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
  members: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutGroupInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutGroupInputSchema).optional(),
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
  members: z.lazy(() => UsersOnGroupsUpdateManyWithoutGroupNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutGroupNestedInputSchema).optional(),
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
  members: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutGroupNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutGroupNestedInputSchema).optional(),
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
  updatedAt: z.coerce.date().optional()
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

export const InvitationCreateInputSchema: z.ZodType<Prisma.InvitationCreateInput> = z.object({
  id: z.string().cuid().optional(),
  inviteeEmail: z.string(),
  status: z.lazy(() => InvitationStatusSchema).optional(),
  group: z.lazy(() => GroupCreateNestedOneWithoutInvitationsInputSchema),
  inviter: z.lazy(() => UserCreateNestedOneWithoutInvitationsInputSchema)
}).strict();

export const InvitationUncheckedCreateInputSchema: z.ZodType<Prisma.InvitationUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  groupId: z.string(),
  inviterId: z.string(),
  inviteeEmail: z.string(),
  status: z.lazy(() => InvitationStatusSchema).optional()
}).strict();

export const InvitationUpdateInputSchema: z.ZodType<Prisma.InvitationUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inviteeEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  group: z.lazy(() => GroupUpdateOneRequiredWithoutInvitationsNestedInputSchema).optional(),
  inviter: z.lazy(() => UserUpdateOneRequiredWithoutInvitationsNestedInputSchema).optional()
}).strict();

export const InvitationUncheckedUpdateInputSchema: z.ZodType<Prisma.InvitationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inviterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inviteeEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationCreateManyInputSchema: z.ZodType<Prisma.InvitationCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  groupId: z.string(),
  inviterId: z.string(),
  inviteeEmail: z.string(),
  status: z.lazy(() => InvitationStatusSchema).optional()
}).strict();

export const InvitationUpdateManyMutationInputSchema: z.ZodType<Prisma.InvitationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inviteeEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InvitationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inviterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inviteeEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuctionCaseCreateInputSchema: z.ZodType<Prisma.AuctionCaseCreateInput> = z.object({
  id: z.string().cuid().optional(),
  caseName: z.string(),
  address: z.string().optional().nullable(),
  addressDetail: z.string().optional().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  actualBidStartsAt: z.coerce.date().optional(),
  appraisedValue: z.number().int().optional(),
  startingBid: z.number().int().optional(),
  image: z.string().optional().nullable(),
  group: z.lazy(() => GroupCreateNestedOneWithoutAuctionCasesInputSchema),
  bids: z.lazy(() => BidCreateNestedManyWithoutAuctionCaseInputSchema).optional()
}).strict();

export const AuctionCaseUncheckedCreateInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  groupId: z.string(),
  caseName: z.string(),
  address: z.string().optional().nullable(),
  addressDetail: z.string().optional().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  actualBidStartsAt: z.coerce.date().optional(),
  appraisedValue: z.number().int().optional(),
  startingBid: z.number().int().optional(),
  image: z.string().optional().nullable(),
  bids: z.lazy(() => BidUncheckedCreateNestedManyWithoutAuctionCaseInputSchema).optional()
}).strict();

export const AuctionCaseUpdateInputSchema: z.ZodType<Prisma.AuctionCaseUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  group: z.lazy(() => GroupUpdateOneRequiredWithoutAuctionCasesNestedInputSchema).optional(),
  bids: z.lazy(() => BidUpdateManyWithoutAuctionCaseNestedInputSchema).optional()
}).strict();

export const AuctionCaseUncheckedUpdateInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bids: z.lazy(() => BidUncheckedUpdateManyWithoutAuctionCaseNestedInputSchema).optional()
}).strict();

export const AuctionCaseCreateManyInputSchema: z.ZodType<Prisma.AuctionCaseCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  groupId: z.string(),
  caseName: z.string(),
  address: z.string().optional().nullable(),
  addressDetail: z.string().optional().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  actualBidStartsAt: z.coerce.date().optional(),
  appraisedValue: z.number().int().optional(),
  startingBid: z.number().int().optional(),
  image: z.string().optional().nullable()
}).strict();

export const AuctionCaseUpdateManyMutationInputSchema: z.ZodType<Prisma.AuctionCaseUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AuctionCaseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  excludedReason: z.string().optional().nullable()
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
  excludedReason: z.string().optional().nullable()
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

export const InvitationListRelationFilterSchema: z.ZodType<Prisma.InvitationListRelationFilter> = z.object({
  every: z.lazy(() => InvitationWhereInputSchema).optional(),
  some: z.lazy(() => InvitationWhereInputSchema).optional(),
  none: z.lazy(() => InvitationWhereInputSchema).optional()
}).strict();

export const BidListRelationFilterSchema: z.ZodType<Prisma.BidListRelationFilter> = z.object({
  every: z.lazy(() => BidWhereInputSchema).optional(),
  some: z.lazy(() => BidWhereInputSchema).optional(),
  none: z.lazy(() => BidWhereInputSchema).optional()
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

export const InvitationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InvitationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BidOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BidOrderByRelationAggregateInput> = z.object({
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
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
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
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
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
  updatedAt: z.lazy(() => SortOrderSchema).optional()
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
  updatedAt: z.lazy(() => SortOrderSchema).optional()
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
  updatedAt: z.lazy(() => SortOrderSchema).optional()
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

export const EnumInvitationStatusFilterSchema: z.ZodType<Prisma.EnumInvitationStatusFilter> = z.object({
  equals: z.lazy(() => InvitationStatusSchema).optional(),
  in: z.lazy(() => InvitationStatusSchema).array().optional(),
  notIn: z.lazy(() => InvitationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => NestedEnumInvitationStatusFilterSchema) ]).optional(),
}).strict();

export const InvitationOrderByRelevanceInputSchema: z.ZodType<Prisma.InvitationOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => InvitationOrderByRelevanceFieldEnumSchema),z.lazy(() => InvitationOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const InvitationCountOrderByAggregateInputSchema: z.ZodType<Prisma.InvitationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  inviterId: z.lazy(() => SortOrderSchema).optional(),
  inviteeEmail: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvitationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InvitationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  inviterId: z.lazy(() => SortOrderSchema).optional(),
  inviteeEmail: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvitationMinOrderByAggregateInputSchema: z.ZodType<Prisma.InvitationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  inviterId: z.lazy(() => SortOrderSchema).optional(),
  inviteeEmail: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumInvitationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumInvitationStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => InvitationStatusSchema).optional(),
  in: z.lazy(() => InvitationStatusSchema).array().optional(),
  notIn: z.lazy(() => InvitationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => NestedEnumInvitationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumInvitationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumInvitationStatusFilterSchema).optional()
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
  actualBidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  appraisedValue: z.lazy(() => SortOrderSchema).optional(),
  startingBid: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuctionCaseAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AuctionCaseAvgOrderByAggregateInput> = z.object({
  appraisedValue: z.lazy(() => SortOrderSchema).optional(),
  startingBid: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuctionCaseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AuctionCaseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  caseName: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  addressDetail: z.lazy(() => SortOrderSchema).optional(),
  bidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  bidEndsAt: z.lazy(() => SortOrderSchema).optional(),
  actualBidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  appraisedValue: z.lazy(() => SortOrderSchema).optional(),
  startingBid: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuctionCaseMinOrderByAggregateInputSchema: z.ZodType<Prisma.AuctionCaseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  caseName: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  addressDetail: z.lazy(() => SortOrderSchema).optional(),
  bidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  bidEndsAt: z.lazy(() => SortOrderSchema).optional(),
  actualBidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  appraisedValue: z.lazy(() => SortOrderSchema).optional(),
  startingBid: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuctionCaseSumOrderByAggregateInputSchema: z.ZodType<Prisma.AuctionCaseSumOrderByAggregateInput> = z.object({
  appraisedValue: z.lazy(() => SortOrderSchema).optional(),
  startingBid: z.lazy(() => SortOrderSchema).optional()
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
  excludedReason: z.lazy(() => SortOrderSchema).optional()
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
  excludedReason: z.lazy(() => SortOrderSchema).optional()
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
  excludedReason: z.lazy(() => SortOrderSchema).optional()
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

export const InvitationCreateNestedManyWithoutInviterInputSchema: z.ZodType<Prisma.InvitationCreateNestedManyWithoutInviterInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCreateWithoutInviterInputSchema),z.lazy(() => InvitationCreateWithoutInviterInputSchema).array(),z.lazy(() => InvitationUncheckedCreateWithoutInviterInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutInviterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCreateOrConnectWithoutInviterInputSchema),z.lazy(() => InvitationCreateOrConnectWithoutInviterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCreateManyInviterInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BidCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BidCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BidCreateWithoutUserInputSchema),z.lazy(() => BidCreateWithoutUserInputSchema).array(),z.lazy(() => BidUncheckedCreateWithoutUserInputSchema),z.lazy(() => BidUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BidCreateOrConnectWithoutUserInputSchema),z.lazy(() => BidCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BidCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
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

export const InvitationUncheckedCreateNestedManyWithoutInviterInputSchema: z.ZodType<Prisma.InvitationUncheckedCreateNestedManyWithoutInviterInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCreateWithoutInviterInputSchema),z.lazy(() => InvitationCreateWithoutInviterInputSchema).array(),z.lazy(() => InvitationUncheckedCreateWithoutInviterInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutInviterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCreateOrConnectWithoutInviterInputSchema),z.lazy(() => InvitationCreateOrConnectWithoutInviterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCreateManyInviterInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BidUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BidUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BidCreateWithoutUserInputSchema),z.lazy(() => BidCreateWithoutUserInputSchema).array(),z.lazy(() => BidUncheckedCreateWithoutUserInputSchema),z.lazy(() => BidUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BidCreateOrConnectWithoutUserInputSchema),z.lazy(() => BidCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BidCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
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

export const InvitationUpdateManyWithoutInviterNestedInputSchema: z.ZodType<Prisma.InvitationUpdateManyWithoutInviterNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCreateWithoutInviterInputSchema),z.lazy(() => InvitationCreateWithoutInviterInputSchema).array(),z.lazy(() => InvitationUncheckedCreateWithoutInviterInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutInviterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCreateOrConnectWithoutInviterInputSchema),z.lazy(() => InvitationCreateOrConnectWithoutInviterInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationUpsertWithWhereUniqueWithoutInviterInputSchema),z.lazy(() => InvitationUpsertWithWhereUniqueWithoutInviterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCreateManyInviterInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationUpdateWithWhereUniqueWithoutInviterInputSchema),z.lazy(() => InvitationUpdateWithWhereUniqueWithoutInviterInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationUpdateManyWithWhereWithoutInviterInputSchema),z.lazy(() => InvitationUpdateManyWithWhereWithoutInviterInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationScalarWhereInputSchema),z.lazy(() => InvitationScalarWhereInputSchema).array() ]).optional(),
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

export const InvitationUncheckedUpdateManyWithoutInviterNestedInputSchema: z.ZodType<Prisma.InvitationUncheckedUpdateManyWithoutInviterNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCreateWithoutInviterInputSchema),z.lazy(() => InvitationCreateWithoutInviterInputSchema).array(),z.lazy(() => InvitationUncheckedCreateWithoutInviterInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutInviterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCreateOrConnectWithoutInviterInputSchema),z.lazy(() => InvitationCreateOrConnectWithoutInviterInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationUpsertWithWhereUniqueWithoutInviterInputSchema),z.lazy(() => InvitationUpsertWithWhereUniqueWithoutInviterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCreateManyInviterInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationUpdateWithWhereUniqueWithoutInviterInputSchema),z.lazy(() => InvitationUpdateWithWhereUniqueWithoutInviterInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationUpdateManyWithWhereWithoutInviterInputSchema),z.lazy(() => InvitationUpdateManyWithWhereWithoutInviterInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationScalarWhereInputSchema),z.lazy(() => InvitationScalarWhereInputSchema).array() ]).optional(),
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

export const InvitationCreateNestedManyWithoutGroupInputSchema: z.ZodType<Prisma.InvitationCreateNestedManyWithoutGroupInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCreateWithoutGroupInputSchema),z.lazy(() => InvitationCreateWithoutGroupInputSchema).array(),z.lazy(() => InvitationUncheckedCreateWithoutGroupInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCreateOrConnectWithoutGroupInputSchema),z.lazy(() => InvitationCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCreateManyGroupInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
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

export const InvitationUncheckedCreateNestedManyWithoutGroupInputSchema: z.ZodType<Prisma.InvitationUncheckedCreateNestedManyWithoutGroupInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCreateWithoutGroupInputSchema),z.lazy(() => InvitationCreateWithoutGroupInputSchema).array(),z.lazy(() => InvitationUncheckedCreateWithoutGroupInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCreateOrConnectWithoutGroupInputSchema),z.lazy(() => InvitationCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCreateManyGroupInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
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

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
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

export const InvitationUpdateManyWithoutGroupNestedInputSchema: z.ZodType<Prisma.InvitationUpdateManyWithoutGroupNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCreateWithoutGroupInputSchema),z.lazy(() => InvitationCreateWithoutGroupInputSchema).array(),z.lazy(() => InvitationUncheckedCreateWithoutGroupInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCreateOrConnectWithoutGroupInputSchema),z.lazy(() => InvitationCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationUpsertWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => InvitationUpsertWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCreateManyGroupInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationUpdateWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => InvitationUpdateWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationUpdateManyWithWhereWithoutGroupInputSchema),z.lazy(() => InvitationUpdateManyWithWhereWithoutGroupInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationScalarWhereInputSchema),z.lazy(() => InvitationScalarWhereInputSchema).array() ]).optional(),
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

export const InvitationUncheckedUpdateManyWithoutGroupNestedInputSchema: z.ZodType<Prisma.InvitationUncheckedUpdateManyWithoutGroupNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCreateWithoutGroupInputSchema),z.lazy(() => InvitationCreateWithoutGroupInputSchema).array(),z.lazy(() => InvitationUncheckedCreateWithoutGroupInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCreateOrConnectWithoutGroupInputSchema),z.lazy(() => InvitationCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationUpsertWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => InvitationUpsertWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCreateManyGroupInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationUpdateWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => InvitationUpdateWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationUpdateManyWithWhereWithoutGroupInputSchema),z.lazy(() => InvitationUpdateManyWithWhereWithoutGroupInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationScalarWhereInputSchema),z.lazy(() => InvitationScalarWhereInputSchema).array() ]).optional(),
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

export const GroupCreateNestedOneWithoutInvitationsInputSchema: z.ZodType<Prisma.GroupCreateNestedOneWithoutInvitationsInput> = z.object({
  create: z.union([ z.lazy(() => GroupCreateWithoutInvitationsInputSchema),z.lazy(() => GroupUncheckedCreateWithoutInvitationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GroupCreateOrConnectWithoutInvitationsInputSchema).optional(),
  connect: z.lazy(() => GroupWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutInvitationsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutInvitationsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumInvitationStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumInvitationStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => InvitationStatusSchema).optional()
}).strict();

export const GroupUpdateOneRequiredWithoutInvitationsNestedInputSchema: z.ZodType<Prisma.GroupUpdateOneRequiredWithoutInvitationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GroupCreateWithoutInvitationsInputSchema),z.lazy(() => GroupUncheckedCreateWithoutInvitationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GroupCreateOrConnectWithoutInvitationsInputSchema).optional(),
  upsert: z.lazy(() => GroupUpsertWithoutInvitationsInputSchema).optional(),
  connect: z.lazy(() => GroupWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GroupUpdateToOneWithWhereWithoutInvitationsInputSchema),z.lazy(() => GroupUpdateWithoutInvitationsInputSchema),z.lazy(() => GroupUncheckedUpdateWithoutInvitationsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutInvitationsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutInvitationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitationsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutInvitationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutInvitationsInputSchema),z.lazy(() => UserUpdateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitationsInputSchema) ]).optional(),
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

export const BidUncheckedCreateNestedManyWithoutAuctionCaseInputSchema: z.ZodType<Prisma.BidUncheckedCreateNestedManyWithoutAuctionCaseInput> = z.object({
  create: z.union([ z.lazy(() => BidCreateWithoutAuctionCaseInputSchema),z.lazy(() => BidCreateWithoutAuctionCaseInputSchema).array(),z.lazy(() => BidUncheckedCreateWithoutAuctionCaseInputSchema),z.lazy(() => BidUncheckedCreateWithoutAuctionCaseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BidCreateOrConnectWithoutAuctionCaseInputSchema),z.lazy(() => BidCreateOrConnectWithoutAuctionCaseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BidCreateManyAuctionCaseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BidWhereUniqueInputSchema),z.lazy(() => BidWhereUniqueInputSchema).array() ]).optional(),
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

export const NestedEnumInvitationStatusFilterSchema: z.ZodType<Prisma.NestedEnumInvitationStatusFilter> = z.object({
  equals: z.lazy(() => InvitationStatusSchema).optional(),
  in: z.lazy(() => InvitationStatusSchema).array().optional(),
  notIn: z.lazy(() => InvitationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => NestedEnumInvitationStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumInvitationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumInvitationStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => InvitationStatusSchema).optional(),
  in: z.lazy(() => InvitationStatusSchema).array().optional(),
  notIn: z.lazy(() => InvitationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => NestedEnumInvitationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumInvitationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumInvitationStatusFilterSchema).optional()
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

export const InvitationCreateWithoutInviterInputSchema: z.ZodType<Prisma.InvitationCreateWithoutInviterInput> = z.object({
  id: z.string().cuid().optional(),
  inviteeEmail: z.string(),
  status: z.lazy(() => InvitationStatusSchema).optional(),
  group: z.lazy(() => GroupCreateNestedOneWithoutInvitationsInputSchema)
}).strict();

export const InvitationUncheckedCreateWithoutInviterInputSchema: z.ZodType<Prisma.InvitationUncheckedCreateWithoutInviterInput> = z.object({
  id: z.string().cuid().optional(),
  groupId: z.string(),
  inviteeEmail: z.string(),
  status: z.lazy(() => InvitationStatusSchema).optional()
}).strict();

export const InvitationCreateOrConnectWithoutInviterInputSchema: z.ZodType<Prisma.InvitationCreateOrConnectWithoutInviterInput> = z.object({
  where: z.lazy(() => InvitationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvitationCreateWithoutInviterInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutInviterInputSchema) ]),
}).strict();

export const InvitationCreateManyInviterInputEnvelopeSchema: z.ZodType<Prisma.InvitationCreateManyInviterInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvitationCreateManyInviterInputSchema),z.lazy(() => InvitationCreateManyInviterInputSchema).array() ]),
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
  excludedReason: z.string().optional().nullable()
}).strict();

export const BidCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.BidCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => BidWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BidCreateWithoutUserInputSchema),z.lazy(() => BidUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const BidCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.BidCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BidCreateManyUserInputSchema),z.lazy(() => BidCreateManyUserInputSchema).array() ]),
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

export const InvitationUpsertWithWhereUniqueWithoutInviterInputSchema: z.ZodType<Prisma.InvitationUpsertWithWhereUniqueWithoutInviterInput> = z.object({
  where: z.lazy(() => InvitationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvitationUpdateWithoutInviterInputSchema),z.lazy(() => InvitationUncheckedUpdateWithoutInviterInputSchema) ]),
  create: z.union([ z.lazy(() => InvitationCreateWithoutInviterInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutInviterInputSchema) ]),
}).strict();

export const InvitationUpdateWithWhereUniqueWithoutInviterInputSchema: z.ZodType<Prisma.InvitationUpdateWithWhereUniqueWithoutInviterInput> = z.object({
  where: z.lazy(() => InvitationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvitationUpdateWithoutInviterInputSchema),z.lazy(() => InvitationUncheckedUpdateWithoutInviterInputSchema) ]),
}).strict();

export const InvitationUpdateManyWithWhereWithoutInviterInputSchema: z.ZodType<Prisma.InvitationUpdateManyWithWhereWithoutInviterInput> = z.object({
  where: z.lazy(() => InvitationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvitationUpdateManyMutationInputSchema),z.lazy(() => InvitationUncheckedUpdateManyWithoutInviterInputSchema) ]),
}).strict();

export const InvitationScalarWhereInputSchema: z.ZodType<Prisma.InvitationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvitationScalarWhereInputSchema),z.lazy(() => InvitationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationScalarWhereInputSchema),z.lazy(() => InvitationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  groupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inviterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inviteeEmail: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumInvitationStatusFilterSchema),z.lazy(() => InvitationStatusSchema) ]).optional(),
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
}).strict();

export const UserCreateWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutInviterInputSchema).optional(),
  bids: z.lazy(() => BidCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutInviterInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedCreateNestedManyWithoutUserInputSchema).optional()
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
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutInviterNestedInputSchema).optional(),
  bids: z.lazy(() => BidUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutInviterNestedInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutInviterInputSchema).optional(),
  bids: z.lazy(() => BidCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutInviterInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedCreateNestedManyWithoutUserInputSchema).optional()
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
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutInviterNestedInputSchema).optional(),
  bids: z.lazy(() => BidUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutInviterNestedInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
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

export const InvitationCreateWithoutGroupInputSchema: z.ZodType<Prisma.InvitationCreateWithoutGroupInput> = z.object({
  id: z.string().cuid().optional(),
  inviteeEmail: z.string(),
  status: z.lazy(() => InvitationStatusSchema).optional(),
  inviter: z.lazy(() => UserCreateNestedOneWithoutInvitationsInputSchema)
}).strict();

export const InvitationUncheckedCreateWithoutGroupInputSchema: z.ZodType<Prisma.InvitationUncheckedCreateWithoutGroupInput> = z.object({
  id: z.string().cuid().optional(),
  inviterId: z.string(),
  inviteeEmail: z.string(),
  status: z.lazy(() => InvitationStatusSchema).optional()
}).strict();

export const InvitationCreateOrConnectWithoutGroupInputSchema: z.ZodType<Prisma.InvitationCreateOrConnectWithoutGroupInput> = z.object({
  where: z.lazy(() => InvitationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvitationCreateWithoutGroupInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutGroupInputSchema) ]),
}).strict();

export const InvitationCreateManyGroupInputEnvelopeSchema: z.ZodType<Prisma.InvitationCreateManyGroupInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvitationCreateManyGroupInputSchema),z.lazy(() => InvitationCreateManyGroupInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AuctionCaseCreateWithoutGroupInputSchema: z.ZodType<Prisma.AuctionCaseCreateWithoutGroupInput> = z.object({
  id: z.string().cuid().optional(),
  caseName: z.string(),
  address: z.string().optional().nullable(),
  addressDetail: z.string().optional().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  actualBidStartsAt: z.coerce.date().optional(),
  appraisedValue: z.number().int().optional(),
  startingBid: z.number().int().optional(),
  image: z.string().optional().nullable(),
  bids: z.lazy(() => BidCreateNestedManyWithoutAuctionCaseInputSchema).optional()
}).strict();

export const AuctionCaseUncheckedCreateWithoutGroupInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedCreateWithoutGroupInput> = z.object({
  id: z.string().cuid().optional(),
  caseName: z.string(),
  address: z.string().optional().nullable(),
  addressDetail: z.string().optional().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  actualBidStartsAt: z.coerce.date().optional(),
  appraisedValue: z.number().int().optional(),
  startingBid: z.number().int().optional(),
  image: z.string().optional().nullable(),
  bids: z.lazy(() => BidUncheckedCreateNestedManyWithoutAuctionCaseInputSchema).optional()
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

export const InvitationUpsertWithWhereUniqueWithoutGroupInputSchema: z.ZodType<Prisma.InvitationUpsertWithWhereUniqueWithoutGroupInput> = z.object({
  where: z.lazy(() => InvitationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvitationUpdateWithoutGroupInputSchema),z.lazy(() => InvitationUncheckedUpdateWithoutGroupInputSchema) ]),
  create: z.union([ z.lazy(() => InvitationCreateWithoutGroupInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutGroupInputSchema) ]),
}).strict();

export const InvitationUpdateWithWhereUniqueWithoutGroupInputSchema: z.ZodType<Prisma.InvitationUpdateWithWhereUniqueWithoutGroupInput> = z.object({
  where: z.lazy(() => InvitationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvitationUpdateWithoutGroupInputSchema),z.lazy(() => InvitationUncheckedUpdateWithoutGroupInputSchema) ]),
}).strict();

export const InvitationUpdateManyWithWhereWithoutGroupInputSchema: z.ZodType<Prisma.InvitationUpdateManyWithWhereWithoutGroupInput> = z.object({
  where: z.lazy(() => InvitationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvitationUpdateManyMutationInputSchema),z.lazy(() => InvitationUncheckedUpdateManyWithoutGroupInputSchema) ]),
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
  actualBidStartsAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  appraisedValue: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  startingBid: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserCreateWithoutGroupsInputSchema: z.ZodType<Prisma.UserCreateWithoutGroupsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutInviterInputSchema).optional(),
  bids: z.lazy(() => BidCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutGroupsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutGroupsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutInviterInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedCreateNestedManyWithoutUserInputSchema).optional()
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
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutGroupInputSchema).optional(),
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
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutGroupInputSchema).optional(),
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
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutInviterNestedInputSchema).optional(),
  bids: z.lazy(() => BidUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutGroupsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutGroupsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutInviterNestedInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
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
  invitations: z.lazy(() => InvitationUpdateManyWithoutGroupNestedInputSchema).optional(),
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
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutGroupNestedInputSchema).optional(),
  auctionCases: z.lazy(() => AuctionCaseUncheckedUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const GroupCreateWithoutInvitationsInputSchema: z.ZodType<Prisma.GroupCreateWithoutInvitationsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  hostId: z.string(),
  isPrivate: z.boolean().optional(),
  password: z.string().optional().nullable(),
  maxMembers: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  members: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutGroupInputSchema).optional(),
  auctionCases: z.lazy(() => AuctionCaseCreateNestedManyWithoutGroupInputSchema).optional()
}).strict();

export const GroupUncheckedCreateWithoutInvitationsInputSchema: z.ZodType<Prisma.GroupUncheckedCreateWithoutInvitationsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  hostId: z.string(),
  isPrivate: z.boolean().optional(),
  password: z.string().optional().nullable(),
  maxMembers: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  members: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutGroupInputSchema).optional(),
  auctionCases: z.lazy(() => AuctionCaseUncheckedCreateNestedManyWithoutGroupInputSchema).optional()
}).strict();

export const GroupCreateOrConnectWithoutInvitationsInputSchema: z.ZodType<Prisma.GroupCreateOrConnectWithoutInvitationsInput> = z.object({
  where: z.lazy(() => GroupWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GroupCreateWithoutInvitationsInputSchema),z.lazy(() => GroupUncheckedCreateWithoutInvitationsInputSchema) ]),
}).strict();

export const UserCreateWithoutInvitationsInputSchema: z.ZodType<Prisma.UserCreateWithoutInvitationsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutUserInputSchema).optional(),
  bids: z.lazy(() => BidCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutInvitationsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutInvitationsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutInvitationsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutInvitationsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitationsInputSchema) ]),
}).strict();

export const GroupUpsertWithoutInvitationsInputSchema: z.ZodType<Prisma.GroupUpsertWithoutInvitationsInput> = z.object({
  update: z.union([ z.lazy(() => GroupUpdateWithoutInvitationsInputSchema),z.lazy(() => GroupUncheckedUpdateWithoutInvitationsInputSchema) ]),
  create: z.union([ z.lazy(() => GroupCreateWithoutInvitationsInputSchema),z.lazy(() => GroupUncheckedCreateWithoutInvitationsInputSchema) ]),
  where: z.lazy(() => GroupWhereInputSchema).optional()
}).strict();

export const GroupUpdateToOneWithWhereWithoutInvitationsInputSchema: z.ZodType<Prisma.GroupUpdateToOneWithWhereWithoutInvitationsInput> = z.object({
  where: z.lazy(() => GroupWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => GroupUpdateWithoutInvitationsInputSchema),z.lazy(() => GroupUncheckedUpdateWithoutInvitationsInputSchema) ]),
}).strict();

export const GroupUpdateWithoutInvitationsInputSchema: z.ZodType<Prisma.GroupUpdateWithoutInvitationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxMembers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => UsersOnGroupsUpdateManyWithoutGroupNestedInputSchema).optional(),
  auctionCases: z.lazy(() => AuctionCaseUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const GroupUncheckedUpdateWithoutInvitationsInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateWithoutInvitationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxMembers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutGroupNestedInputSchema).optional(),
  auctionCases: z.lazy(() => AuctionCaseUncheckedUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutInvitationsInputSchema: z.ZodType<Prisma.UserUpsertWithoutInvitationsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitationsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitationsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutInvitationsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInvitationsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitationsInputSchema) ]),
}).strict();

export const UserUpdateWithoutInvitationsInputSchema: z.ZodType<Prisma.UserUpdateWithoutInvitationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUpdateManyWithoutUserNestedInputSchema).optional(),
  bids: z.lazy(() => BidUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutInvitationsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutInvitationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  bids: z.lazy(() => BidUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
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
  members: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutGroupInputSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutGroupInputSchema).optional()
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
  members: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutGroupInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutGroupInputSchema).optional()
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
  excludedReason: z.string().optional().nullable()
}).strict();

export const BidCreateOrConnectWithoutAuctionCaseInputSchema: z.ZodType<Prisma.BidCreateOrConnectWithoutAuctionCaseInput> = z.object({
  where: z.lazy(() => BidWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BidCreateWithoutAuctionCaseInputSchema),z.lazy(() => BidUncheckedCreateWithoutAuctionCaseInputSchema) ]),
}).strict();

export const BidCreateManyAuctionCaseInputEnvelopeSchema: z.ZodType<Prisma.BidCreateManyAuctionCaseInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BidCreateManyAuctionCaseInputSchema),z.lazy(() => BidCreateManyAuctionCaseInputSchema).array() ]),
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
  members: z.lazy(() => UsersOnGroupsUpdateManyWithoutGroupNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutGroupNestedInputSchema).optional()
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
  members: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutGroupNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutGroupNestedInputSchema).optional()
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

export const AuctionCaseCreateWithoutBidsInputSchema: z.ZodType<Prisma.AuctionCaseCreateWithoutBidsInput> = z.object({
  id: z.string().cuid().optional(),
  caseName: z.string(),
  address: z.string().optional().nullable(),
  addressDetail: z.string().optional().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  actualBidStartsAt: z.coerce.date().optional(),
  appraisedValue: z.number().int().optional(),
  startingBid: z.number().int().optional(),
  image: z.string().optional().nullable(),
  group: z.lazy(() => GroupCreateNestedOneWithoutAuctionCasesInputSchema)
}).strict();

export const AuctionCaseUncheckedCreateWithoutBidsInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedCreateWithoutBidsInput> = z.object({
  id: z.string().cuid().optional(),
  groupId: z.string(),
  caseName: z.string(),
  address: z.string().optional().nullable(),
  addressDetail: z.string().optional().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  actualBidStartsAt: z.coerce.date().optional(),
  appraisedValue: z.number().int().optional(),
  startingBid: z.number().int().optional(),
  image: z.string().optional().nullable()
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
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutInviterInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutBidsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBidsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Account: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutInviterInputSchema).optional()
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
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  group: z.lazy(() => GroupUpdateOneRequiredWithoutAuctionCasesNestedInputSchema).optional()
}).strict();

export const AuctionCaseUncheckedUpdateWithoutBidsInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedUpdateWithoutBidsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutInviterNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutBidsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutBidsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  groups: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutInviterNestedInputSchema).optional()
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

export const InvitationCreateManyInviterInputSchema: z.ZodType<Prisma.InvitationCreateManyInviterInput> = z.object({
  id: z.string().cuid().optional(),
  groupId: z.string(),
  inviteeEmail: z.string(),
  status: z.lazy(() => InvitationStatusSchema).optional()
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
  excludedReason: z.string().optional().nullable()
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

export const InvitationUpdateWithoutInviterInputSchema: z.ZodType<Prisma.InvitationUpdateWithoutInviterInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inviteeEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  group: z.lazy(() => GroupUpdateOneRequiredWithoutInvitationsNestedInputSchema).optional()
}).strict();

export const InvitationUncheckedUpdateWithoutInviterInputSchema: z.ZodType<Prisma.InvitationUncheckedUpdateWithoutInviterInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inviteeEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationUncheckedUpdateManyWithoutInviterInputSchema: z.ZodType<Prisma.InvitationUncheckedUpdateManyWithoutInviterInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inviteeEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
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
}).strict();

export const UsersOnGroupsCreateManyGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsCreateManyGroupInput> = z.object({
  userId: z.string(),
  invitedBy: z.string(),
  joinedAt: z.coerce.date().optional()
}).strict();

export const InvitationCreateManyGroupInputSchema: z.ZodType<Prisma.InvitationCreateManyGroupInput> = z.object({
  id: z.string().cuid().optional(),
  inviterId: z.string(),
  inviteeEmail: z.string(),
  status: z.lazy(() => InvitationStatusSchema).optional()
}).strict();

export const AuctionCaseCreateManyGroupInputSchema: z.ZodType<Prisma.AuctionCaseCreateManyGroupInput> = z.object({
  id: z.string().cuid().optional(),
  caseName: z.string(),
  address: z.string().optional().nullable(),
  addressDetail: z.string().optional().nullable(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  actualBidStartsAt: z.coerce.date().optional(),
  appraisedValue: z.number().int().optional(),
  startingBid: z.number().int().optional(),
  image: z.string().optional().nullable()
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

export const InvitationUpdateWithoutGroupInputSchema: z.ZodType<Prisma.InvitationUpdateWithoutGroupInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inviteeEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  inviter: z.lazy(() => UserUpdateOneRequiredWithoutInvitationsNestedInputSchema).optional()
}).strict();

export const InvitationUncheckedUpdateWithoutGroupInputSchema: z.ZodType<Prisma.InvitationUncheckedUpdateWithoutGroupInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inviterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inviteeEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationUncheckedUpdateManyWithoutGroupInputSchema: z.ZodType<Prisma.InvitationUncheckedUpdateManyWithoutGroupInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inviterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inviteeEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuctionCaseUpdateWithoutGroupInputSchema: z.ZodType<Prisma.AuctionCaseUpdateWithoutGroupInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bids: z.lazy(() => BidUpdateManyWithoutAuctionCaseNestedInputSchema).optional()
}).strict();

export const AuctionCaseUncheckedUpdateWithoutGroupInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedUpdateWithoutGroupInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bids: z.lazy(() => BidUncheckedUpdateManyWithoutAuctionCaseNestedInputSchema).optional()
}).strict();

export const AuctionCaseUncheckedUpdateManyWithoutGroupInputSchema: z.ZodType<Prisma.AuctionCaseUncheckedUpdateManyWithoutGroupInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addressDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualBidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appraisedValue: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startingBid: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  excludedReason: z.string().optional().nullable()
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

export const InvitationFindFirstArgsSchema: z.ZodType<Prisma.InvitationFindFirstArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: InvitationIncludeSchema.optional(),
  where: InvitationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationOrderByWithRelationInputSchema.array(),InvitationOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvitationScalarFieldEnumSchema,InvitationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvitationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InvitationFindFirstOrThrowArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: InvitationIncludeSchema.optional(),
  where: InvitationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationOrderByWithRelationInputSchema.array(),InvitationOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvitationScalarFieldEnumSchema,InvitationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvitationFindManyArgsSchema: z.ZodType<Prisma.InvitationFindManyArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: InvitationIncludeSchema.optional(),
  where: InvitationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationOrderByWithRelationInputSchema.array(),InvitationOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvitationScalarFieldEnumSchema,InvitationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvitationAggregateArgsSchema: z.ZodType<Prisma.InvitationAggregateArgs> = z.object({
  where: InvitationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationOrderByWithRelationInputSchema.array(),InvitationOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InvitationGroupByArgsSchema: z.ZodType<Prisma.InvitationGroupByArgs> = z.object({
  where: InvitationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationOrderByWithAggregationInputSchema.array(),InvitationOrderByWithAggregationInputSchema ]).optional(),
  by: InvitationScalarFieldEnumSchema.array(),
  having: InvitationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InvitationFindUniqueArgsSchema: z.ZodType<Prisma.InvitationFindUniqueArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: InvitationIncludeSchema.optional(),
  where: InvitationWhereUniqueInputSchema,
}).strict() ;

export const InvitationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InvitationFindUniqueOrThrowArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: InvitationIncludeSchema.optional(),
  where: InvitationWhereUniqueInputSchema,
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

export const InvitationCreateArgsSchema: z.ZodType<Prisma.InvitationCreateArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: InvitationIncludeSchema.optional(),
  data: z.union([ InvitationCreateInputSchema,InvitationUncheckedCreateInputSchema ]),
}).strict() ;

export const InvitationUpsertArgsSchema: z.ZodType<Prisma.InvitationUpsertArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: InvitationIncludeSchema.optional(),
  where: InvitationWhereUniqueInputSchema,
  create: z.union([ InvitationCreateInputSchema,InvitationUncheckedCreateInputSchema ]),
  update: z.union([ InvitationUpdateInputSchema,InvitationUncheckedUpdateInputSchema ]),
}).strict() ;

export const InvitationCreateManyArgsSchema: z.ZodType<Prisma.InvitationCreateManyArgs> = z.object({
  data: z.union([ InvitationCreateManyInputSchema,InvitationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const InvitationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.InvitationCreateManyAndReturnArgs> = z.object({
  data: z.union([ InvitationCreateManyInputSchema,InvitationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const InvitationDeleteArgsSchema: z.ZodType<Prisma.InvitationDeleteArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: InvitationIncludeSchema.optional(),
  where: InvitationWhereUniqueInputSchema,
}).strict() ;

export const InvitationUpdateArgsSchema: z.ZodType<Prisma.InvitationUpdateArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: InvitationIncludeSchema.optional(),
  data: z.union([ InvitationUpdateInputSchema,InvitationUncheckedUpdateInputSchema ]),
  where: InvitationWhereUniqueInputSchema,
}).strict() ;

export const InvitationUpdateManyArgsSchema: z.ZodType<Prisma.InvitationUpdateManyArgs> = z.object({
  data: z.union([ InvitationUpdateManyMutationInputSchema,InvitationUncheckedUpdateManyInputSchema ]),
  where: InvitationWhereInputSchema.optional(),
}).strict() ;

export const InvitationDeleteManyArgsSchema: z.ZodType<Prisma.InvitationDeleteManyArgs> = z.object({
  where: InvitationWhereInputSchema.optional(),
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