import Loading from '@/components/Loading';
import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import GroupList from '@/components/pages/Home/GroupList';
import HomeHeaderButtons from '@/components/pages/Home/HomeHeaderButtons';
import { withAuth } from '@/lib/auth/hoc';
import { Suspense } from 'react';

export default withAuth(function Home() {
  return (
    <>
      <PageHeader title="내가 속한 그룹" className="max-w-2xl">
        <HomeHeaderButtons />
      </PageHeader>
      <PageBody className="max-w-2xl">
        <Suspense fallback={<Loading size="lg" />}>
          <GroupList />
        </Suspense>
      </PageBody>
    </>
  );
});
