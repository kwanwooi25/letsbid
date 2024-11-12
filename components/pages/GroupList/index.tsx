'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Suspense } from 'react';
import GroupListSkeleton from './GroupListSkeleton';
import GroupTabsList from './GroupTabsList';
import HeaderButtons from './HeaderButtons';
import { GROUP_LIST_TABS, GROUP_LIST_TABS_CONTENT, useGroupTabs } from './useGroupTabs';

export default function GroupList() {
  const { tab, handleTabChange } = useGroupTabs();

  return (
    <Tabs defaultValue={tab} value={tab} onValueChange={handleTabChange}>
      <PageHeader title="그룹 목록" className="max-w-xl lg:max-w-lg">
        <HeaderButtons />
      </PageHeader>
      <PageBody className="max-w-xl w-full lg:max-w-4xl lg:grid lg:grid-cols-[172px_1fr_172px] lg:gap-4 lg:items-start">
        <GroupTabsList />
        {GROUP_LIST_TABS.map((t) => {
          const Component = GROUP_LIST_TABS_CONTENT[t];
          return (
            <TabsContent className="py-4 mt-0 lg:py-0" key={t} value={t}>
              <Suspense fallback={<GroupListSkeleton />}>
                <Component />
              </Suspense>
            </TabsContent>
          );
        })}
      </PageBody>
    </Tabs>
  );
}
