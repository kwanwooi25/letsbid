import { useTabs } from '@/hooks/useTabs';
import { ComponentType } from 'react';
import AllGroupList from './AllGroupList';
import ArchivedGroupList from './ArchivedGroupList';
import MyGroupList from './MyGroupList';

export const GROUP_LIST_TABS = ['myGroups', 'all', 'archived'] as const;

export type GroupListTabs = (typeof GROUP_LIST_TABS)[number];

export const GROUP_LIST_TABS_TRANSLATIONS: Record<GroupListTabs, string> = {
  myGroups: '참여중인 그룹',
  all: '참여 가능한 그룹',
  archived: '숨겨진 그룹',
};

export const GROUP_LIST_TABS_CONTENT: Record<GroupListTabs, ComponentType> = {
  myGroups: MyGroupList,
  all: AllGroupList,
  archived: ArchivedGroupList,
};

export function useGroupTabs() {
  return useTabs<GroupListTabs>({ defaultTab: 'myGroups' });
}
