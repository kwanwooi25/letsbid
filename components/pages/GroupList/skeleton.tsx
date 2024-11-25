import PageBody from '@/components/layouts/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import GroupListSkeleton from './List/skeleton';
import GroupListPageToolbar from './Toolbar';
import { GROUP_LIST_TABS } from './useGroupListTabs';

export default function GroupListPageSkeleton() {
  return (
    <Tabs className="max-w-2xl lg:max-w-5xl mx-auto">
      <Skeleton.PageHeader title="그룹 목록" className="lg:mx-[176px]" />
      <PageBody className="w-full pt-0 lg:grid lg:grid-cols-[160px_1fr_160px] lg:gap-4 lg:items-start">
        <div className="bg-background -mx-4 px-4 pt-1 pb-4 sticky top-[132px] lg:mx-0 lg:px-0">
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
