import { useTabs } from '@/hooks/useTabs';

export const GROUP_LIST_TABS = ['myGroups', 'all', 'archived'] as const;

export type GroupListTabs = (typeof GROUP_LIST_TABS)[number];

export function useGroupTabs() {
  return useTabs<'myGroups' | 'all'>({ defaultTab: 'myGroups' });
}
