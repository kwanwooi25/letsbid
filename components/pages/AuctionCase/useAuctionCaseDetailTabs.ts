import { useTabs } from '@/hooks/useTabs';

export const AUCTION_CASE_DETAIL_TABS = ['introduction', 'bids'] as const;

export type AuctionCaseDetailTabs = (typeof AUCTION_CASE_DETAIL_TABS)[number];

export const AUCTION_CASE_DETAIL_TABS_TRANSLATIONS: Record<AuctionCaseDetailTabs, string> = {
  introduction: '기초 정보',
  bids: '입찰',
};

export function useAuctionCaseDetailTabs() {
  return useTabs<AuctionCaseDetailTabs>({ defaultTab: 'introduction' });
}