import TabNavigation from '@/components/common/TabNavigation';
import { GROUP_LIST_TABS, GROUP_LIST_TABS_TRANSLATIONS } from '../useGroupListTabs';

export default function GroupListTabsList() {
  return <TabNavigation tabs={[...GROUP_LIST_TABS]} labelMap={GROUP_LIST_TABS_TRANSLATIONS} />;
}
