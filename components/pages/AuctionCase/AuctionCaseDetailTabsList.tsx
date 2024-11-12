import TabNavigation from '@/components/TabNavigation';
import {
  AUCTION_CASE_DETAIL_TABS,
  AUCTION_CASE_DETAIL_TABS_TRANSLATIONS,
} from './useAuctionCaseDetailTabs';

export default function AuctionCaseDetailTabsList() {
  return (
    <TabNavigation
      tabs={[...AUCTION_CASE_DETAIL_TABS]}
      labelMap={AUCTION_CASE_DETAIL_TABS_TRANSLATIONS}
    />
  );
}
