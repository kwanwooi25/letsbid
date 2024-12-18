'use client';

import SearchInput from '@/components/common/SearchInput';
import { useSearchInput } from '@/components/common/SearchInput/useSearchInput';
import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useGroupRouter } from '@/features/group/hooks/useGroupRouter';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';
import GroupListSkeleton from './List/skeleton';
import GroupListPageToolbar from './Toolbar';
import {
  GROUP_LIST_TABS,
  GROUP_LIST_TABS_CONTENT,
  GROUP_LIST_TABS_TRANSLATIONS,
  useGroupListTabs,
} from './useGroupListTabs';

export default function GroupList() {
  const { isAdmin } = useLoggedInUser();
  const { tab, handleTabChange } = useGroupListTabs();
  const { moveToCreateGroup } = useGroupRouter();
  const { search, setSearch } = useSearchInput();
  const { isScrolled } = useWindowScroll();

  return (
    <Tabs
      className="max-w-2xl lg:max-w-5xl mx-auto"
      defaultValue={tab}
      value={tab}
      onValueChange={(value) => handleTabChange(value as typeof tab)}
    >
      <PageHeader
        title="그룹 목록"
        className="flex-row items-center lg:mx-[176px]"
        hideBottomBorderOnScroll
      >
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Button type="button" onClick={moveToCreateGroup}>
              그룹 생성
            </Button>
          )}
        </div>
      </PageHeader>
      <PageBody className="w-full pt-0 lg:grid lg:grid-cols-[160px_1fr_160px] lg:gap-4 lg:items-start">
        <div
          className={cn(
            'bg-background -mx-4 px-4 pt-1 pb-4 sticky top-[132px] lg:mx-0 lg:px-0',
            isScrolled && 'border-b lg:border-none',
          )}
        >
          <GroupListPageToolbar />
          <SearchInput
            className="mt-4 lg:hidden"
            defaultValue={search}
            onSearch={setSearch}
            placeholder={`${GROUP_LIST_TABS_TRANSLATIONS[tab]} 검색`}
          />
        </div>
        <div>
          <SearchInput
            className={cn(
              'hidden lg:flex pt-1 pb-4 sticky top-[132px] bg-background',
              isScrolled && 'border-b',
            )}
            defaultValue={search}
            onSearch={setSearch}
            placeholder={`${GROUP_LIST_TABS_TRANSLATIONS[tab]} 검색`}
          />
          {GROUP_LIST_TABS.map((t) => {
            const Component = GROUP_LIST_TABS_CONTENT[t];
            return (
              <TabsContent className="py-0 mt-0" key={t} value={t}>
                <Suspense fallback={<GroupListSkeleton />}>
                  <Component />
                </Suspense>
              </TabsContent>
            );
          })}
        </div>
      </PageBody>
    </Tabs>
  );
}
