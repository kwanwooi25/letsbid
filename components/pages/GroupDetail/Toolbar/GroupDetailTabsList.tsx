import TabNavigation from '@/components/TabNavigation';
import { GROUP_DETAIL_TABS, GROUP_DETAIL_TABS_TRANSLATIONS } from '../useGroupDetailTabs';

export default function GroupDetailTabsList() {
  return <TabNavigation tabs={[...GROUP_DETAIL_TABS]} labelMap={GROUP_DETAIL_TABS_TRANSLATIONS} />;
}
