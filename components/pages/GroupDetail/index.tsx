'use client';

import HostBadge from '@/components/common/HostBadge';
import SearchInput from '@/components/common/SearchInput';
import { useSearchInput } from '@/components/common/SearchInput/useSearchInput';
import UserRoleBadge from '@/components/common/UserRoleBadge';
import { GNB_HEIGHT } from '@/components/layouts/const';
import PageAlert from '@/components/layouts/PageAlert';
import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import GroupMenu from '@/features/group/GroupMenu';
import { getGroupDetailQueryOptions } from '@/features/group/query';
import { useIsGroupMember } from '@/features/group/useIsGroupMember';
import { getMinimumUserRole } from '@/features/group/utils';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { formatDateTime } from '@/lib/datetime';
import { cn } from '@/lib/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { LucideEyeOff } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import AuctionCaseList from './AuctionCaseList';
import AuctionCaseListSkeleton from './AuctionCaseList/skeleton';
import MemberList from './MemberList';
import MemberListSkeleton from './MemberList/skeleton';
import GroupDetailPageToolbar from './Toolbar';
import { GROUP_DETAIL_TABS_TRANSLATIONS, useGroupDetailTabs } from './useGroupDetailTabs';

export default function GroupDetail() {
  const params = useParams();
  const groupId = params.groupId as string;
  const { data: group } = useSuspenseQuery(getGroupDetailQueryOptions(groupId));
  const { isViceGroupHost, isGroupAdmin } = useIsGroupMember(group);
  const { tab, handleTabChange } = useGroupDetailTabs();
  const { search, setSearch } = useSearchInput();
  const { isScrolled } = useWindowScroll();
  const { loggedInUser } = useLoggedInUser();
  const minimumRole = getMinimumUserRole(group.userRoles);
  const isActable = loggedInUser && group.userRoles.includes(loggedInUser.role);

  const isArchived = !!group.archivedAt;

  return (
    <>
      <Tabs
        className="max-w-2xl lg:max-w-5xl mx-auto"
        style={{ minHeight: `calc(100vh - ${GNB_HEIGHT}px)` }}
        defaultValue={tab}
        value={tab}
        onValueChange={(value) => handleTabChange(value as typeof tab)}
      >
        <PageHeader
          className="lg:mx-[176px] lg:border-none"
          backButton
          title={
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                {isArchived && (
                  <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 bg-secondary">
                    <LucideEyeOff className="w-4 h-4" />
                  </div>
                )}
                <span className="text-xl font-semibold line-clamp-2">{group.name}</span>
                {isGroupAdmin && <HostBadge isViceHost={isViceGroupHost} />}
              </div>
              {isArchived && (
                <div className="text-xs text-primary/50 font-semibold">
                  {formatDateTime(group.archivedAt!, 'yyyy-MM-dd HH:mm에 숨겨짐')}
                </div>
              )}
            </div>
          }
        >
          <GroupMenu group={group} />
        </PageHeader>

        <PageBody className="w-full pt-0 lg:grid lg:grid-cols-[160px_1fr_160px] lg:gap-4 lg:items-start">
          <div
            className={cn(
              'z-header bg-background -mx-4 px-4 pt-1 pb-4 sticky top-[132px] lg:mx-0 lg:px-0',
              isScrolled && 'border-b lg:border-none',
            )}
          >
            <GroupDetailPageToolbar group={group} />
            <SearchInput
              className="mt-4 lg:hidden"
              defaultValue={search}
              onSearch={setSearch}
              placeholder={`${GROUP_DETAIL_TABS_TRANSLATIONS[tab]} 검색`}
            />
          </div>
          <div>
            <SearchInput
              className={cn(
                'hidden lg:flex pt-1 pb-4 sticky top-[132px] bg-background z-header',
                isScrolled && 'border-b',
              )}
              defaultValue={search}
              onSearch={setSearch}
              placeholder={`${GROUP_DETAIL_TABS_TRANSLATIONS[tab]} 검색`}
            />
            <TabsContent value="auctionCases" className="py-0 mt-0">
              <Suspense fallback={<AuctionCaseListSkeleton />}>
                <AuctionCaseList isAbleToCreateAuctionCase={isGroupAdmin && !isArchived} />
              </Suspense>
            </TabsContent>
            <TabsContent value="members" className="py-0 mt-0">
              <Suspense fallback={<MemberListSkeleton />}>
                <MemberList group={group} />
              </Suspense>
            </TabsContent>
          </div>
        </PageBody>
      </Tabs>
      {!isActable && (
        <PageAlert>
          <span>이 그룹에서 활동하실 수 없습니다</span>
          <span className="flex items-center gap-1">
            최소 회원 등급: <UserRoleBadge role={minimumRole} withRoleName />
          </span>
        </PageAlert>
      )}
    </>
  );
}
