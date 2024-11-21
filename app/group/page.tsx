import Loading from '@/components/common/Loading';
import { withAuth } from '@/features/auth/hoc';
import dynamic from 'next/dynamic';

const GroupList = dynamic(() => import('@/components/pages/GroupList'), {
  ssr: false,
  loading: () => <Loading fullscreen />,
});

export default withAuth(GroupList);
