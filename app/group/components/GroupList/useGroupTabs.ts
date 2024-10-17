import { useTabs } from '@/hooks/useTabs';

export function useGroupTabs() {
  return useTabs<'myGroups' | 'all'>({ defaultTab: 'myGroups' });
}
