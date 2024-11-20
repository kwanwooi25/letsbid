import { withAuth } from '@/features/auth/hoc';
import dynamic from 'next/dynamic';

const GroupList = dynamic(() => import('@/components/pages/GroupList'), { ssr: false });

export default withAuth(GroupList);
