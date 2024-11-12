import { useTabs } from '@/hooks/useTabs';

export const GROUP_DETAIL_TABS = ['auctionCases', 'members'] as const;

export type GroupDetailTabs = (typeof GROUP_DETAIL_TABS)[number];

export const GROUP_DETAIL_TABS_TRANSLATIONS: Record<GroupDetailTabs, string> = {
  auctionCases: '경매 사건',
  members: '멤버',
};

export function useGroupDetailTabs() {
  return useTabs<GroupDetailTabs>({ defaultTab: 'auctionCases' });
}
