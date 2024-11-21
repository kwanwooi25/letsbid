import PageBody from '@/components/layouts/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import GroupListSkeleton from './List/skeleton';
import GroupListPageToolbar from './Toolbar';
import { GROUP_LIST_TABS } from './useGroupListTabs';

export default function GroupListPageSkeleton() {
  return (
    <Tabs value={GROUP_LIST_TABS[0]}>
      <Skeleton.PageHeader title="그룹 목록" className="max-w-xl lg:max-w-lg" />
      <PageBody className="max-w-xl w-full pt-0 lg:max-w-4xl lg:grid lg:grid-cols-[240px_1fr_240px] lg:gap-4 lg:items-start">
        <div className="bg-background -mx-4 px-4 pt-1 pb-4 sticky top-[132px]">
          <GroupListPageToolbar />
          <Skeleton className="h-[40px] w-full mt-4 lg:hidden" />
        </div>
        <div>
          <Skeleton className="h-[40px] w-full hidden lg:flex pt-1 pb-4 sticky top-[132px] bg-background" />
          {GROUP_LIST_TABS.map((t) => (
            <TabsContent className="py-0 mt-0" key={t} value={t}>
              <GroupListSkeleton />
            </TabsContent>
          ))}
        </div>
      </PageBody>
    </Tabs>
  );
}
