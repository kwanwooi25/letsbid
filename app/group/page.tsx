import { withAuth } from '@/features/auth/withAuth';
import dynamic from 'next/dynamic';
import GroupListPageSkeleton from './loading';

const GroupList = dynamic(() => import('@/components/pages/GroupList'), {
  ssr: false,
  loading: () => <GroupListPageSkeleton />,
});

export default withAuth(GroupList);
