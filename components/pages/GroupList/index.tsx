'use client';

import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useSession } from 'next-auth/react';
import { Suspense } from 'react';
import { GROUP_CREATION_ALLOWED_USERS } from './const';
import GroupListSkeleton from './List/skeleton';
import GroupListPageToolbar from './Toolbar';
import { useGroupListRouter } from './useGroupListRouter';
import { GROUP_LIST_TABS, GROUP_LIST_TABS_CONTENT, useGroupListTabs } from './useGroupListTabs';

export default function GroupList() {
  const session = useSession();
  const { tab, handleTabChange } = useGroupListTabs();
  const { moveToCreateGroup } = useGroupListRouter();

  return (
    <Tabs defaultValue={tab} value={tab} onValueChange={handleTabChange}>
      <PageHeader title="그룹 목록" className="max-w-2xl">
        <div className="flex items-center gap-2">
          {!!session?.data?.user?.email &&
            GROUP_CREATION_ALLOWED_USERS.includes(session?.data?.user?.email) && (
              <Button type="button" onClick={moveToCreateGroup}>
                그룹 생성
              </Button>
            )}
        </div>
      </PageHeader>
      <PageBody className="max-w-2xl w-full lg:max-w-5xl lg:grid lg:grid-cols-[160px_1fr_160px] lg:gap-4 lg:items-start">
        <GroupListPageToolbar />
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
