import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GROUP_LIST_TABS, GROUP_LIST_TABS_TRANSLATIONS } from './useGroupTabs';

export default function GroupTabsList() {
  return (
    <TabsList className="w-full">
      {GROUP_LIST_TABS.map((t) => (
        <TabsTrigger key={t} value={t} className="w-full">
          {GROUP_LIST_TABS_TRANSLATIONS[t]}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
