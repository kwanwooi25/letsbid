import TabNavigation from '@/components/TabNavigation';
import { GROUP_LIST_TABS, GROUP_LIST_TABS_TRANSLATIONS } from './useGroupTabs';

export default function GroupTabsList() {
  return <TabNavigation tabs={[...GROUP_LIST_TABS]} labelMap={GROUP_LIST_TABS_TRANSLATIONS} />;
}
