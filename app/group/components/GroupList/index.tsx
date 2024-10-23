'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabs } from '@/hooks/useTabs';
import { Suspense } from 'react';
import AllGroupList from './AllGroupList';
import GroupListSkeleton from './GroupListSkeleton';
import HeaderButtons from './HeaderButtons';
import MyGroupList from './MyGroupList';

export default function GroupList() {
  const { tab, handleTabChange } = useTabs<'myGroups' | 'all'>({ defaultTab: 'myGroups' });

  return (
    <>
      <PageHeader title="그룹 목록" className="max-w-xl">
        <HeaderButtons />
      </PageHeader>
      <PageBody className="max-w-xl">
        <Tabs defaultValue={tab} value={tab} onValueChange={handleTabChange}>
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="myGroups">
              참여중인 그룹
            </TabsTrigger>
            <TabsTrigger className="w-full" value="all">
              참여 가능한 그룹
            </TabsTrigger>
          </TabsList>
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
        </Tabs>
      </PageBody>
    </>
  );
}
