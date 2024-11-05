'use client';

import PageBody from '@/components/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import GroupListSkeleton from './GroupListSkeleton';
import GroupTabsList from './GroupTabsList';
import { useGroupTabs } from './useGroupTabs';

export default function GroupListPageSkeleton() {
  const { tab } = useGroupTabs();

  return (
    <>
      <Skeleton.PageHeader title="그룹 목록" className="max-w-xl" />
      <PageBody className="max-w-xl">
        <Tabs value={tab}>
          <GroupTabsList />
          <TabsContent value="myGroups">
            <GroupListSkeleton />
          </TabsContent>
          <TabsContent value="all">
            <GroupListSkeleton />
          </TabsContent>
          <TabsContent value="archived">
            <GroupListSkeleton />
          </TabsContent>
        </Tabs>
      </PageBody>
    </>
  );
}
