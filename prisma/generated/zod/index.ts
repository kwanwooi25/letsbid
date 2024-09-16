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

export const GroupScalarFieldEnumSchema = z.enum(['id','name','hostId','createdAt','updatedAt']);

export const UsersOnGroupsScalarFieldEnumSchema = z.enum(['userId','groupId','joinedAt','invitedBy']);

export const InvitationScalarFieldEnumSchema = z.enum(['id','groupId','inviterId','inviteeEmail','status']);

export const CaseScalarFieldEnumSchema = z.enum(['id','caseYear','caseNumber','groupId','bidStartsAt','bidEndsAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const UserOrderByRelevanceFieldEnumSchema = z.enum(['id','name','email','password','image']);

export const AccountOrderByRelevanceFieldEnumSchema = z.enum(['userId','type','provider','providerAccountId','refresh_token','access_token','token_type','scope','id_token','session_state']);

export const SessionOrderByRelevanceFieldEnumSchema = z.enum(['sessionToken','userId']);

export const GroupOrderByRelevanceFieldEnumSchema = z.enum(['id','name','hostId']);

export const UsersOnGroupsOrderByRelevanceFieldEnumSchema = z.enum(['userId','groupId','invitedBy']);

export const InvitationOrderByRelevanceFieldEnumSchema = z.enum(['id','groupId','inviterId','inviteeEmail']);

export const CaseOrderByRelevanceFieldEnumSchema = z.enum(['id','groupId']);

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
  hostId: z.string(),
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
  joinedAt: z.coerce.date(),
  invitedBy: z.string(),
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
// CASE SCHEMA
/////////////////////////////////////////

export const CaseSchema = z.object({
  id: z.string().cuid(),
  caseYear: z.number().int(),
  caseNumber: z.number().int(),
  groupId: z.string(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
})

export type Case = z.infer<typeof CaseSchema>

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
  cases: z.union([z.boolean(),z.lazy(() => CaseFindManyArgsSchema)]).optional(),
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
  cases: z.boolean().optional(),
}).strict();

export const GroupSelectSchema: z.ZodType<Prisma.GroupSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  hostId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  members: z.union([z.boolean(),z.lazy(() => UsersOnGroupsFindManyArgsSchema)]).optional(),
  invitations: z.union([z.boolean(),z.lazy(() => InvitationFindManyArgsSchema)]).optional(),
  cases: z.union([z.boolean(),z.lazy(() => CaseFindManyArgsSchema)]).optional(),
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
  joinedAt: z.boolean().optional(),
  invitedBy: z.boolean().optional(),
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

// CASE
//------------------------------------------------------

export const CaseIncludeSchema: z.ZodType<Prisma.CaseInclude> = z.object({
  group: z.union([z.boolean(),z.lazy(() => GroupArgsSchema)]).optional(),
}).strict()

export const CaseArgsSchema: z.ZodType<Prisma.CaseDefaultArgs> = z.object({
  select: z.lazy(() => CaseSelectSchema).optional(),
  include: z.lazy(() => CaseIncludeSchema).optional(),
}).strict();

export const CaseSelectSchema: z.ZodType<Prisma.CaseSelect> = z.object({
  id: z.boolean().optional(),
  caseYear: z.boolean().optional(),
  caseNumber: z.boolean().optional(),
  groupId: z.boolean().optional(),
  bidStartsAt: z.boolean().optional(),
  bidEndsAt: z.boolean().optional(),
  group: z.union([z.boolean(),z.lazy(() => GroupArgsSchema)]).optional(),
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
  invitations: z.lazy(() => InvitationListRelationFilterSchema).optional()
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
  invitations: z.lazy(() => InvitationListRelationFilterSchema).optional()
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
  hostId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  members: z.lazy(() => UsersOnGroupsListRelationFilterSchema).optional(),
  invitations: z.lazy(() => InvitationListRelationFilterSchema).optional(),
  cases: z.lazy(() => CaseListRelationFilterSchema).optional()
}).strict();

export const GroupOrderByWithRelationInputSchema: z.ZodType<Prisma.GroupOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  members: z.lazy(() => UsersOnGroupsOrderByRelationAggregateInputSchema).optional(),
  invitations: z.lazy(() => InvitationOrderByRelationAggregateInputSchema).optional(),
  cases: z.lazy(() => CaseOrderByRelationAggregateInputSchema).optional(),
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
  hostId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  members: z.lazy(() => UsersOnGroupsListRelationFilterSchema).optional(),
  invitations: z.lazy(() => InvitationListRelationFilterSchema).optional(),
  cases: z.lazy(() => CaseListRelationFilterSchema).optional()
}).strict());

export const GroupOrderByWithAggregationInputSchema: z.ZodType<Prisma.GroupOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => GroupCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GroupMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GroupMinOrderByAggregateInputSchema).optional()
}).strict();

export const GroupScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GroupScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GroupScalarWhereWithAggregatesInputSchema),z.lazy(() => GroupScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GroupScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GroupScalarWhereWithAggregatesInputSchema),z.lazy(() => GroupScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hostId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UsersOnGroupsWhereInputSchema: z.ZodType<Prisma.UsersOnGroupsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UsersOnGroupsWhereInputSchema),z.lazy(() => UsersOnGroupsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersOnGroupsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersOnGroupsWhereInputSchema),z.lazy(() => UsersOnGroupsWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  groupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  joinedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  invitedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  group: z.union([ z.lazy(() => GroupRelationFilterSchema),z.lazy(() => GroupWhereInputSchema) ]).optional(),
}).strict();

export const UsersOnGroupsOrderByWithRelationInputSchema: z.ZodType<Prisma.UsersOnGroupsOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  joinedAt: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional(),
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
  joinedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  invitedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  group: z.union([ z.lazy(() => GroupRelationFilterSchema),z.lazy(() => GroupWhereInputSchema) ]).optional(),
}).strict());

export const UsersOnGroupsOrderByWithAggregationInputSchema: z.ZodType<Prisma.UsersOnGroupsOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  joinedAt: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional(),
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
  joinedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  invitedBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
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

export const CaseWhereInputSchema: z.ZodType<Prisma.CaseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CaseWhereInputSchema),z.lazy(() => CaseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CaseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CaseWhereInputSchema),z.lazy(() => CaseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  caseYear: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  caseNumber: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  groupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bidStartsAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  bidEndsAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  group: z.union([ z.lazy(() => GroupRelationFilterSchema),z.lazy(() => GroupWhereInputSchema) ]).optional(),
}).strict();

export const CaseOrderByWithRelationInputSchema: z.ZodType<Prisma.CaseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  caseYear: z.lazy(() => SortOrderSchema).optional(),
  caseNumber: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  bidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  bidEndsAt: z.lazy(() => SortOrderSchema).optional(),
  group: z.lazy(() => GroupOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => CaseOrderByRelevanceInputSchema).optional()
}).strict();

export const CaseWhereUniqueInputSchema: z.ZodType<Prisma.CaseWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CaseWhereInputSchema),z.lazy(() => CaseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CaseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CaseWhereInputSchema),z.lazy(() => CaseWhereInputSchema).array() ]).optional(),
  caseYear: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  caseNumber: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  groupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bidStartsAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  bidEndsAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  group: z.union([ z.lazy(() => GroupRelationFilterSchema),z.lazy(() => GroupWhereInputSchema) ]).optional(),
}).strict());

export const CaseOrderByWithAggregationInputSchema: z.ZodType<Prisma.CaseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  caseYear: z.lazy(() => SortOrderSchema).optional(),
  caseNumber: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  bidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  bidEndsAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CaseCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CaseAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CaseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CaseMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CaseSumOrderByAggregateInputSchema).optional()
}).strict();

export const CaseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CaseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CaseScalarWhereWithAggregatesInputSchema),z.lazy(() => CaseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CaseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CaseScalarWhereWithAggregatesInputSchema),z.lazy(() => CaseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  caseYear: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  caseNumber: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  groupId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  bidStartsAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  bidEndsAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
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
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutInviterInputSchema).optional()
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
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutInviterInputSchema).optional()
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
  invitations: z.lazy(() => InvitationUpdateManyWithoutInviterNestedInputSchema).optional()
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
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutInviterNestedInputSchema).optional()
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
  hostId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  members: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutGroupInputSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutGroupInputSchema).optional(),
  cases: z.lazy(() => CaseCreateNestedManyWithoutGroupInputSchema).optional()
}).strict();

export const GroupUncheckedCreateInputSchema: z.ZodType<Prisma.GroupUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  hostId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  members: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutGroupInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutGroupInputSchema).optional(),
  cases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutGroupInputSchema).optional()
}).strict();

export const GroupUpdateInputSchema: z.ZodType<Prisma.GroupUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => UsersOnGroupsUpdateManyWithoutGroupNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutGroupNestedInputSchema).optional(),
  cases: z.lazy(() => CaseUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const GroupUncheckedUpdateInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutGroupNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutGroupNestedInputSchema).optional(),
  cases: z.lazy(() => CaseUncheckedUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const GroupCreateManyInputSchema: z.ZodType<Prisma.GroupCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  hostId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const GroupUpdateManyMutationInputSchema: z.ZodType<Prisma.GroupUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GroupUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersOnGroupsCreateInputSchema: z.ZodType<Prisma.UsersOnGroupsCreateInput> = z.object({
  joinedAt: z.coerce.date().optional(),
  invitedBy: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutGroupsInputSchema),
  group: z.lazy(() => GroupCreateNestedOneWithoutMembersInputSchema)
}).strict();

export const UsersOnGroupsUncheckedCreateInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedCreateInput> = z.object({
  userId: z.string(),
  groupId: z.string(),
  joinedAt: z.coerce.date().optional(),
  invitedBy: z.string()
}).strict();

export const UsersOnGroupsUpdateInputSchema: z.ZodType<Prisma.UsersOnGroupsUpdateInput> = z.object({
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutGroupsNestedInputSchema).optional(),
  group: z.lazy(() => GroupUpdateOneRequiredWithoutMembersNestedInputSchema).optional()
}).strict();

export const UsersOnGroupsUncheckedUpdateInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersOnGroupsCreateManyInputSchema: z.ZodType<Prisma.UsersOnGroupsCreateManyInput> = z.object({
  userId: z.string(),
  groupId: z.string(),
  joinedAt: z.coerce.date().optional(),
  invitedBy: z.string()
}).strict();

export const UsersOnGroupsUpdateManyMutationInputSchema: z.ZodType<Prisma.UsersOnGroupsUpdateManyMutationInput> = z.object({
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersOnGroupsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const CaseCreateInputSchema: z.ZodType<Prisma.CaseCreateInput> = z.object({
  id: z.string().cuid().optional(),
  caseYear: z.number().int(),
  caseNumber: z.number().int(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date(),
  group: z.lazy(() => GroupCreateNestedOneWithoutCasesInputSchema)
}).strict();

export const CaseUncheckedCreateInputSchema: z.ZodType<Prisma.CaseUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  caseYear: z.number().int(),
  caseNumber: z.number().int(),
  groupId: z.string(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date()
}).strict();

export const CaseUpdateInputSchema: z.ZodType<Prisma.CaseUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  caseNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  group: z.lazy(() => GroupUpdateOneRequiredWithoutCasesNestedInputSchema).optional()
}).strict();

export const CaseUncheckedUpdateInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  caseNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CaseCreateManyInputSchema: z.ZodType<Prisma.CaseCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  caseYear: z.number().int(),
  caseNumber: z.number().int(),
  groupId: z.string(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date()
}).strict();

export const CaseUpdateManyMutationInputSchema: z.ZodType<Prisma.CaseUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  caseNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CaseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  caseNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const CaseListRelationFilterSchema: z.ZodType<Prisma.CaseListRelationFilter> = z.object({
  every: z.lazy(() => CaseWhereInputSchema).optional(),
  some: z.lazy(() => CaseWhereInputSchema).optional(),
  none: z.lazy(() => CaseWhereInputSchema).optional()
}).strict();

export const CaseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CaseOrderByRelationAggregateInput> = z.object({
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
  hostId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GroupMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GroupMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GroupMinOrderByAggregateInputSchema: z.ZodType<Prisma.GroupMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
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
  joinedAt: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersOnGroupsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UsersOnGroupsMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  joinedAt: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersOnGroupsMinOrderByAggregateInputSchema: z.ZodType<Prisma.UsersOnGroupsMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  joinedAt: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional()
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

export const CaseOrderByRelevanceInputSchema: z.ZodType<Prisma.CaseOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => CaseOrderByRelevanceFieldEnumSchema),z.lazy(() => CaseOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const CaseCountOrderByAggregateInputSchema: z.ZodType<Prisma.CaseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  caseYear: z.lazy(() => SortOrderSchema).optional(),
  caseNumber: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  bidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  bidEndsAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CaseAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CaseAvgOrderByAggregateInput> = z.object({
  caseYear: z.lazy(() => SortOrderSchema).optional(),
  caseNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CaseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CaseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  caseYear: z.lazy(() => SortOrderSchema).optional(),
  caseNumber: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  bidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  bidEndsAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CaseMinOrderByAggregateInputSchema: z.ZodType<Prisma.CaseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  caseYear: z.lazy(() => SortOrderSchema).optional(),
  caseNumber: z.lazy(() => SortOrderSchema).optional(),
  groupId: z.lazy(() => SortOrderSchema).optional(),
  bidStartsAt: z.lazy(() => SortOrderSchema).optional(),
  bidEndsAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CaseSumOrderByAggregateInputSchema: z.ZodType<Prisma.CaseSumOrderByAggregateInput> = z.object({
  caseYear: z.lazy(() => SortOrderSchema).optional(),
  caseNumber: z.lazy(() => SortOrderSchema).optional()
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

export const CaseCreateNestedManyWithoutGroupInputSchema: z.ZodType<Prisma.CaseCreateNestedManyWithoutGroupInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutGroupInputSchema),z.lazy(() => CaseCreateWithoutGroupInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutGroupInputSchema),z.lazy(() => CaseUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutGroupInputSchema),z.lazy(() => CaseCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CaseCreateManyGroupInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
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

export const CaseUncheckedCreateNestedManyWithoutGroupInputSchema: z.ZodType<Prisma.CaseUncheckedCreateNestedManyWithoutGroupInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutGroupInputSchema),z.lazy(() => CaseCreateWithoutGroupInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutGroupInputSchema),z.lazy(() => CaseUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutGroupInputSchema),z.lazy(() => CaseCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CaseCreateManyGroupInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
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

export const CaseUpdateManyWithoutGroupNestedInputSchema: z.ZodType<Prisma.CaseUpdateManyWithoutGroupNestedInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutGroupInputSchema),z.lazy(() => CaseCreateWithoutGroupInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutGroupInputSchema),z.lazy(() => CaseUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutGroupInputSchema),z.lazy(() => CaseCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CaseUpsertWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => CaseUpsertWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CaseCreateManyGroupInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CaseUpdateWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => CaseUpdateWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CaseUpdateManyWithWhereWithoutGroupInputSchema),z.lazy(() => CaseUpdateManyWithWhereWithoutGroupInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CaseScalarWhereInputSchema),z.lazy(() => CaseScalarWhereInputSchema).array() ]).optional(),
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

export const CaseUncheckedUpdateManyWithoutGroupNestedInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateManyWithoutGroupNestedInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutGroupInputSchema),z.lazy(() => CaseCreateWithoutGroupInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutGroupInputSchema),z.lazy(() => CaseUncheckedCreateWithoutGroupInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutGroupInputSchema),z.lazy(() => CaseCreateOrConnectWithoutGroupInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CaseUpsertWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => CaseUpsertWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CaseCreateManyGroupInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CaseUpdateWithWhereUniqueWithoutGroupInputSchema),z.lazy(() => CaseUpdateWithWhereUniqueWithoutGroupInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CaseUpdateManyWithWhereWithoutGroupInputSchema),z.lazy(() => CaseUpdateManyWithWhereWithoutGroupInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CaseScalarWhereInputSchema),z.lazy(() => CaseScalarWhereInputSchema).array() ]).optional(),
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

export const GroupCreateNestedOneWithoutCasesInputSchema: z.ZodType<Prisma.GroupCreateNestedOneWithoutCasesInput> = z.object({
  create: z.union([ z.lazy(() => GroupCreateWithoutCasesInputSchema),z.lazy(() => GroupUncheckedCreateWithoutCasesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GroupCreateOrConnectWithoutCasesInputSchema).optional(),
  connect: z.lazy(() => GroupWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const GroupUpdateOneRequiredWithoutCasesNestedInputSchema: z.ZodType<Prisma.GroupUpdateOneRequiredWithoutCasesNestedInput> = z.object({
  create: z.union([ z.lazy(() => GroupCreateWithoutCasesInputSchema),z.lazy(() => GroupUncheckedCreateWithoutCasesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GroupCreateOrConnectWithoutCasesInputSchema).optional(),
  upsert: z.lazy(() => GroupUpsertWithoutCasesInputSchema).optional(),
  connect: z.lazy(() => GroupWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GroupUpdateToOneWithWhereWithoutCasesInputSchema),z.lazy(() => GroupUpdateWithoutCasesInputSchema),z.lazy(() => GroupUncheckedUpdateWithoutCasesInputSchema) ]).optional(),
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
  joinedAt: z.coerce.date().optional(),
  invitedBy: z.string(),
  group: z.lazy(() => GroupCreateNestedOneWithoutMembersInputSchema)
}).strict();

export const UsersOnGroupsUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedCreateWithoutUserInput> = z.object({
  groupId: z.string(),
  joinedAt: z.coerce.date().optional(),
  invitedBy: z.string()
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
  joinedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  invitedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
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
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutInviterInputSchema).optional()
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
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutInviterInputSchema).optional()
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
  invitations: z.lazy(() => InvitationUpdateManyWithoutInviterNestedInputSchema).optional()
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
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutInviterNestedInputSchema).optional()
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
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutInviterInputSchema).optional()
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
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutInviterInputSchema).optional()
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
  invitations: z.lazy(() => InvitationUpdateManyWithoutInviterNestedInputSchema).optional()
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
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutInviterNestedInputSchema).optional()
}).strict();

export const UsersOnGroupsCreateWithoutGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsCreateWithoutGroupInput> = z.object({
  joinedAt: z.coerce.date().optional(),
  invitedBy: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutGroupsInputSchema)
}).strict();

export const UsersOnGroupsUncheckedCreateWithoutGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedCreateWithoutGroupInput> = z.object({
  userId: z.string(),
  joinedAt: z.coerce.date().optional(),
  invitedBy: z.string()
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

export const CaseCreateWithoutGroupInputSchema: z.ZodType<Prisma.CaseCreateWithoutGroupInput> = z.object({
  id: z.string().cuid().optional(),
  caseYear: z.number().int(),
  caseNumber: z.number().int(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date()
}).strict();

export const CaseUncheckedCreateWithoutGroupInputSchema: z.ZodType<Prisma.CaseUncheckedCreateWithoutGroupInput> = z.object({
  id: z.string().cuid().optional(),
  caseYear: z.number().int(),
  caseNumber: z.number().int(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date()
}).strict();

export const CaseCreateOrConnectWithoutGroupInputSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutGroupInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CaseCreateWithoutGroupInputSchema),z.lazy(() => CaseUncheckedCreateWithoutGroupInputSchema) ]),
}).strict();

export const CaseCreateManyGroupInputEnvelopeSchema: z.ZodType<Prisma.CaseCreateManyGroupInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CaseCreateManyGroupInputSchema),z.lazy(() => CaseCreateManyGroupInputSchema).array() ]),
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

export const CaseUpsertWithWhereUniqueWithoutGroupInputSchema: z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutGroupInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CaseUpdateWithoutGroupInputSchema),z.lazy(() => CaseUncheckedUpdateWithoutGroupInputSchema) ]),
  create: z.union([ z.lazy(() => CaseCreateWithoutGroupInputSchema),z.lazy(() => CaseUncheckedCreateWithoutGroupInputSchema) ]),
}).strict();

export const CaseUpdateWithWhereUniqueWithoutGroupInputSchema: z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutGroupInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CaseUpdateWithoutGroupInputSchema),z.lazy(() => CaseUncheckedUpdateWithoutGroupInputSchema) ]),
}).strict();

export const CaseUpdateManyWithWhereWithoutGroupInputSchema: z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutGroupInput> = z.object({
  where: z.lazy(() => CaseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CaseUpdateManyMutationInputSchema),z.lazy(() => CaseUncheckedUpdateManyWithoutGroupInputSchema) ]),
}).strict();

export const CaseScalarWhereInputSchema: z.ZodType<Prisma.CaseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CaseScalarWhereInputSchema),z.lazy(() => CaseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CaseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CaseScalarWhereInputSchema),z.lazy(() => CaseScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  caseYear: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  caseNumber: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  groupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bidStartsAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  bidEndsAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
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
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutInviterInputSchema).optional()
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
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutInviterInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutGroupsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutGroupsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutGroupsInputSchema),z.lazy(() => UserUncheckedCreateWithoutGroupsInputSchema) ]),
}).strict();

export const GroupCreateWithoutMembersInputSchema: z.ZodType<Prisma.GroupCreateWithoutMembersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  hostId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutGroupInputSchema).optional(),
  cases: z.lazy(() => CaseCreateNestedManyWithoutGroupInputSchema).optional()
}).strict();

export const GroupUncheckedCreateWithoutMembersInputSchema: z.ZodType<Prisma.GroupUncheckedCreateWithoutMembersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  hostId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutGroupInputSchema).optional(),
  cases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutGroupInputSchema).optional()
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
  invitations: z.lazy(() => InvitationUpdateManyWithoutInviterNestedInputSchema).optional()
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
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutInviterNestedInputSchema).optional()
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
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutGroupNestedInputSchema).optional(),
  cases: z.lazy(() => CaseUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const GroupUncheckedUpdateWithoutMembersInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateWithoutMembersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutGroupNestedInputSchema).optional(),
  cases: z.lazy(() => CaseUncheckedUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const GroupCreateWithoutInvitationsInputSchema: z.ZodType<Prisma.GroupCreateWithoutInvitationsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  hostId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  members: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutGroupInputSchema).optional(),
  cases: z.lazy(() => CaseCreateNestedManyWithoutGroupInputSchema).optional()
}).strict();

export const GroupUncheckedCreateWithoutInvitationsInputSchema: z.ZodType<Prisma.GroupUncheckedCreateWithoutInvitationsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  hostId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  members: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutGroupInputSchema).optional(),
  cases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutGroupInputSchema).optional()
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
  groups: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutUserInputSchema).optional()
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
  groups: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutUserInputSchema).optional()
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
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => UsersOnGroupsUpdateManyWithoutGroupNestedInputSchema).optional(),
  cases: z.lazy(() => CaseUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const GroupUncheckedUpdateWithoutInvitationsInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateWithoutInvitationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutGroupNestedInputSchema).optional(),
  cases: z.lazy(() => CaseUncheckedUpdateManyWithoutGroupNestedInputSchema).optional()
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
  groups: z.lazy(() => UsersOnGroupsUpdateManyWithoutUserNestedInputSchema).optional()
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
  groups: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const GroupCreateWithoutCasesInputSchema: z.ZodType<Prisma.GroupCreateWithoutCasesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  hostId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  members: z.lazy(() => UsersOnGroupsCreateNestedManyWithoutGroupInputSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutGroupInputSchema).optional()
}).strict();

export const GroupUncheckedCreateWithoutCasesInputSchema: z.ZodType<Prisma.GroupUncheckedCreateWithoutCasesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  hostId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  members: z.lazy(() => UsersOnGroupsUncheckedCreateNestedManyWithoutGroupInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutGroupInputSchema).optional()
}).strict();

export const GroupCreateOrConnectWithoutCasesInputSchema: z.ZodType<Prisma.GroupCreateOrConnectWithoutCasesInput> = z.object({
  where: z.lazy(() => GroupWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GroupCreateWithoutCasesInputSchema),z.lazy(() => GroupUncheckedCreateWithoutCasesInputSchema) ]),
}).strict();

export const GroupUpsertWithoutCasesInputSchema: z.ZodType<Prisma.GroupUpsertWithoutCasesInput> = z.object({
  update: z.union([ z.lazy(() => GroupUpdateWithoutCasesInputSchema),z.lazy(() => GroupUncheckedUpdateWithoutCasesInputSchema) ]),
  create: z.union([ z.lazy(() => GroupCreateWithoutCasesInputSchema),z.lazy(() => GroupUncheckedCreateWithoutCasesInputSchema) ]),
  where: z.lazy(() => GroupWhereInputSchema).optional()
}).strict();

export const GroupUpdateToOneWithWhereWithoutCasesInputSchema: z.ZodType<Prisma.GroupUpdateToOneWithWhereWithoutCasesInput> = z.object({
  where: z.lazy(() => GroupWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => GroupUpdateWithoutCasesInputSchema),z.lazy(() => GroupUncheckedUpdateWithoutCasesInputSchema) ]),
}).strict();

export const GroupUpdateWithoutCasesInputSchema: z.ZodType<Prisma.GroupUpdateWithoutCasesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => UsersOnGroupsUpdateManyWithoutGroupNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutGroupNestedInputSchema).optional()
}).strict();

export const GroupUncheckedUpdateWithoutCasesInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateWithoutCasesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => UsersOnGroupsUncheckedUpdateManyWithoutGroupNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutGroupNestedInputSchema).optional()
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
  joinedAt: z.coerce.date().optional(),
  invitedBy: z.string()
}).strict();

export const InvitationCreateManyInviterInputSchema: z.ZodType<Prisma.InvitationCreateManyInviterInput> = z.object({
  id: z.string().cuid().optional(),
  groupId: z.string(),
  inviteeEmail: z.string(),
  status: z.lazy(() => InvitationStatusSchema).optional()
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
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  group: z.lazy(() => GroupUpdateOneRequiredWithoutMembersNestedInputSchema).optional()
}).strict();

export const UsersOnGroupsUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedUpdateWithoutUserInput> = z.object({
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersOnGroupsUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedUpdateManyWithoutUserInput> = z.object({
  groupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const UsersOnGroupsCreateManyGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsCreateManyGroupInput> = z.object({
  userId: z.string(),
  joinedAt: z.coerce.date().optional(),
  invitedBy: z.string()
}).strict();

export const InvitationCreateManyGroupInputSchema: z.ZodType<Prisma.InvitationCreateManyGroupInput> = z.object({
  id: z.string().cuid().optional(),
  inviterId: z.string(),
  inviteeEmail: z.string(),
  status: z.lazy(() => InvitationStatusSchema).optional()
}).strict();

export const CaseCreateManyGroupInputSchema: z.ZodType<Prisma.CaseCreateManyGroupInput> = z.object({
  id: z.string().cuid().optional(),
  caseYear: z.number().int(),
  caseNumber: z.number().int(),
  bidStartsAt: z.coerce.date(),
  bidEndsAt: z.coerce.date()
}).strict();

export const UsersOnGroupsUpdateWithoutGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsUpdateWithoutGroupInput> = z.object({
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutGroupsNestedInputSchema).optional()
}).strict();

export const UsersOnGroupsUncheckedUpdateWithoutGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedUpdateWithoutGroupInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersOnGroupsUncheckedUpdateManyWithoutGroupInputSchema: z.ZodType<Prisma.UsersOnGroupsUncheckedUpdateManyWithoutGroupInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const CaseUpdateWithoutGroupInputSchema: z.ZodType<Prisma.CaseUpdateWithoutGroupInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  caseNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CaseUncheckedUpdateWithoutGroupInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateWithoutGroupInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  caseNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CaseUncheckedUpdateManyWithoutGroupInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateManyWithoutGroupInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caseYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  caseNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bidStartsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bidEndsAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const CaseFindFirstArgsSchema: z.ZodType<Prisma.CaseFindFirstArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereInputSchema.optional(),
  orderBy: z.union([ CaseOrderByWithRelationInputSchema.array(),CaseOrderByWithRelationInputSchema ]).optional(),
  cursor: CaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CaseScalarFieldEnumSchema,CaseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CaseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CaseFindFirstOrThrowArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereInputSchema.optional(),
  orderBy: z.union([ CaseOrderByWithRelationInputSchema.array(),CaseOrderByWithRelationInputSchema ]).optional(),
  cursor: CaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CaseScalarFieldEnumSchema,CaseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CaseFindManyArgsSchema: z.ZodType<Prisma.CaseFindManyArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereInputSchema.optional(),
  orderBy: z.union([ CaseOrderByWithRelationInputSchema.array(),CaseOrderByWithRelationInputSchema ]).optional(),
  cursor: CaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CaseScalarFieldEnumSchema,CaseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CaseAggregateArgsSchema: z.ZodType<Prisma.CaseAggregateArgs> = z.object({
  where: CaseWhereInputSchema.optional(),
  orderBy: z.union([ CaseOrderByWithRelationInputSchema.array(),CaseOrderByWithRelationInputSchema ]).optional(),
  cursor: CaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CaseGroupByArgsSchema: z.ZodType<Prisma.CaseGroupByArgs> = z.object({
  where: CaseWhereInputSchema.optional(),
  orderBy: z.union([ CaseOrderByWithAggregationInputSchema.array(),CaseOrderByWithAggregationInputSchema ]).optional(),
  by: CaseScalarFieldEnumSchema.array(),
  having: CaseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CaseFindUniqueArgsSchema: z.ZodType<Prisma.CaseFindUniqueArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereUniqueInputSchema,
}).strict() ;

export const CaseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CaseFindUniqueOrThrowArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereUniqueInputSchema,
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

export const CaseCreateArgsSchema: z.ZodType<Prisma.CaseCreateArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  data: z.union([ CaseCreateInputSchema,CaseUncheckedCreateInputSchema ]),
}).strict() ;

export const CaseUpsertArgsSchema: z.ZodType<Prisma.CaseUpsertArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereUniqueInputSchema,
  create: z.union([ CaseCreateInputSchema,CaseUncheckedCreateInputSchema ]),
  update: z.union([ CaseUpdateInputSchema,CaseUncheckedUpdateInputSchema ]),
}).strict() ;

export const CaseCreateManyArgsSchema: z.ZodType<Prisma.CaseCreateManyArgs> = z.object({
  data: z.union([ CaseCreateManyInputSchema,CaseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CaseCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CaseCreateManyAndReturnArgs> = z.object({
  data: z.union([ CaseCreateManyInputSchema,CaseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CaseDeleteArgsSchema: z.ZodType<Prisma.CaseDeleteArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereUniqueInputSchema,
}).strict() ;

export const CaseUpdateArgsSchema: z.ZodType<Prisma.CaseUpdateArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  data: z.union([ CaseUpdateInputSchema,CaseUncheckedUpdateInputSchema ]),
  where: CaseWhereUniqueInputSchema,
}).strict() ;

export const CaseUpdateManyArgsSchema: z.ZodType<Prisma.CaseUpdateManyArgs> = z.object({
  data: z.union([ CaseUpdateManyMutationInputSchema,CaseUncheckedUpdateManyInputSchema ]),
  where: CaseWhereInputSchema.optional(),
}).strict() ;

export const CaseDeleteManyArgsSchema: z.ZodType<Prisma.CaseDeleteManyArgs> = z.object({
  where: CaseWhereInputSchema.optional(),
}).strict() ;