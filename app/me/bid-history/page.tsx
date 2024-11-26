import { withAuth } from '@/features/auth/withAuth';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import UserBidHistorySkeleton from './loading';
import { Metadata } from 'next';
import { getAppName } from '@/lib/env';

const UserBidHistory = dynamic(() => import('@/components/pages/UserBidHistory'), {
  ssr: false,
  loading: () => <UserBidHistorySkeleton />,
});

export const metadata: Metadata = {
  title: `내 입찰 기록 | ${getAppName()}`,
};

export default withAuth(function () {
  return (
    <Suspense fallback={<UserBidHistorySkeleton />}>
      <UserBidHistory />
    </Suspense>
  );
});
