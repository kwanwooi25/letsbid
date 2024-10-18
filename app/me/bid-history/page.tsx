import UserBidHistory from '@/app/me/components/UserBidHistory';
import Loading from '@/components/Loading';
import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { withAuth } from '@/lib/auth/hoc';
import { Suspense } from 'react';

export default withAuth(function () {
  return (
    <>
      <PageHeader className="max-w-lg" title="내 입찰 기록" />
      <PageBody className="max-w-lg">
        <Suspense fallback={<Loading />}>
          <UserBidHistory />
        </Suspense>
      </PageBody>
    </>
  );
});
