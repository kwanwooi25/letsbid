import { useTabs } from '@/hooks/useTabs';
import { ComponentType } from 'react';
import ArchivedGroupList from './List/ArchivedGroupList';
import JoinableGroupList from './List/JoinableGroupList';
import JoinedGroupList from './List/JoinedGroupList';

export const GROUP_LIST_TABS = ['joined', 'joinable', 'archived'] as const;

export type GroupListTabs = (typeof GROUP_LIST_TABS)[number];

export const GROUP_LIST_TABS_TRANSLATIONS: Record<GroupListTabs, string> = {
  joined: '참여중인 그룹',
  joinable: '참여 가능한 그룹',
  archived: '숨겨진 그룹',
};

export const GROUP_LIST_TABS_CONTENT: Record<GroupListTabs, ComponentType> = {
  joined: JoinedGroupList,
  joinable: JoinableGroupList,
  archived: ArchivedGroupList,
};

export function useGroupListTabs() {
  return useTabs<GroupListTabs>({ defaultTab: 'joined' });
}
