'use client';

import PageBody from '@/components/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import GroupListSkeleton from './GroupListSkeleton';
import GroupTabsList from './GroupTabsList';
import { GROUP_LIST_TABS, useGroupTabs } from './useGroupTabs';

export default function GroupListPageSkeleton() {
  const { tab } = useGroupTabs();

  return (
    <Tabs value={tab}>
      <Skeleton.PageHeader title="그룹 목록" className="max-w-xl lg:max-w-lg" />
      <PageBody className="max-w-xl w-full lg:max-w-4xl lg:grid lg:grid-cols-[240px_1fr_240px] lg:gap-4 lg:items-start">
        <GroupTabsList />
        {GROUP_LIST_TABS.map((t) => (
          <TabsContent className="py-4 mt-0 lg:py-0" key={t} value={t}>
            <GroupListSkeleton />
          </TabsContent>
        ))}
      </PageBody>
    </Tabs>
  );
}
