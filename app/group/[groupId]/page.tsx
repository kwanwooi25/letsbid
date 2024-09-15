import GroupDetail from '@/components/pages/Group/GroupDetail';
import { withAuth } from '@/lib/auth/hoc';
import { Suspense } from 'react';

export default withAuth(function Group({
  params,
  searchParams,
}: {
  params: { groupId: string };
  searchParams: { tab: Parameters<typeof GroupDetail>[0]['tab'] };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GroupDetail groupId={params.groupId} tab={searchParams.tab ?? 'cases'} />
    </Suspense>
  );
});
