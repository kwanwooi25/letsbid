'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Suspense } from 'react';
import AllGroupList from './AllGroupList';
import ArchivedGroupList from './ArchivedGroupList';
import GroupListSkeleton from './GroupListSkeleton';
import GroupTabsList from './GroupTabsList';
import HeaderButtons from './HeaderButtons';
import MyGroupList from './MyGroupList';
import { useGroupTabs } from './useGroupTabs';

export default function GroupList() {
  const { tab, handleTabChange } = useGroupTabs();

  return (
    <>
      <PageHeader title="그룹 목록" className="max-w-xl">
        <HeaderButtons />
      </PageHeader>
      <PageBody className="max-w-xl">
        <Tabs defaultValue={tab} value={tab} onValueChange={handleTabChange}>
          <GroupTabsList />
          <TabsContent value="myGroups">
            <Suspense fallback={<GroupListSkeleton />}>
              <MyGroupList />
            </Suspense>
          </TabsContent>
          <TabsContent value="all">
            <Suspense fallback={<GroupListSkeleton />}>
              <AllGroupList />
            </Suspense>
          </TabsContent>
          <TabsContent value="archived">
            <Suspense fallback={<GroupListSkeleton />}>
              <ArchivedGroupList />
            </Suspense>
          </TabsContent>
        </Tabs>
      </PageBody>
    </>
  );
}
