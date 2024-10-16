'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import HeaderButtons from './HeaderButtons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabs } from '@/hooks/useTabs';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import MyGroupList from './MyGroupList';
import AllGroupList from './AllGroupList';

export default function Group() {
  const { tab, handleTabChange } = useTabs<'myGroups' | 'all'>({ defaultTab: 'myGroups' });

  return (
    <>
      <PageHeader title="그룹 목록" className="max-w-lg">
        <HeaderButtons />
      </PageHeader>
      <PageBody className="max-w-lg">
        <Tabs defaultValue={tab} value={tab} onValueChange={handleTabChange}>
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="myGroups">
              내가 속한 그룹
            </TabsTrigger>
            <TabsTrigger className="w-full" value="all">
              전체 그룹
            </TabsTrigger>
          </TabsList>
          <TabsContent value="myGroups">
            <Suspense fallback={<Loading />}>
              <MyGroupList />
            </Suspense>
          </TabsContent>
          <TabsContent value="all">
            <Suspense fallback={<Loading />}>
              <AllGroupList />
            </Suspense>
          </TabsContent>
        </Tabs>
      </PageBody>
    </>
  );
}
