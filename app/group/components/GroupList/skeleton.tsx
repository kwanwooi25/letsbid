'use client';

import PageBody from '@/components/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabs } from '@/hooks/useTabs';
import GroupListSkeleton from './GroupListSkeleton';

export default function GroupListPageSkeleton() {
  const { tab } = useTabs<'myGroups' | 'all'>({ defaultTab: 'myGroups' });

  return (
    <>
      <Skeleton.PageHeader title="그룹 목록" className="max-w-xl" />
      <PageBody className="max-w-xl">
        <Tabs value={tab}>
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="myGroups">
              참여중인 그룹
            </TabsTrigger>
            <TabsTrigger className="w-full" value="all">
              참여 가능한 그룹
            </TabsTrigger>
          </TabsList>
          <TabsContent value="myGroups">
            <GroupListSkeleton />
          </TabsContent>
          <TabsContent value="all">
            <GroupListSkeleton />
          </TabsContent>
        </Tabs>
      </PageBody>
    </>
  );
}
