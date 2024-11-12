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
    <>
      <PageHeader title="그룹 목록" className="max-w-xl">
        <HeaderButtons />
      </PageHeader>
      <PageBody className="max-w-xl w-full">
        <Tabs defaultValue={tab} value={tab} onValueChange={handleTabChange}>
          <GroupTabsList />
          {GROUP_LIST_TABS.map((t) => {
            const Component = GROUP_LIST_TABS_CONTENT[t];
            return (
              <TabsContent key={t} value={t}>
                <Suspense fallback={<GroupListSkeleton />}>
                  <Component />
                </Suspense>
              </TabsContent>
            );
          })}
        </Tabs>
      </PageBody>
    </>
  );
}
