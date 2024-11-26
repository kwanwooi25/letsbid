import { withAuth } from '@/features/auth/withAuth';
import { getAppName } from '@/lib/env';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import GroupListPageSkeleton from './loading';

const GroupList = dynamic(() => import('@/components/pages/GroupList'), {
  ssr: false,
  loading: () => <GroupListPageSkeleton />,
});

export const metadata: Metadata = {
  title: `그룹 목록 | ${getAppName()}`,
};

export default withAuth(GroupList);
