import GroupForm from '@/components/pages/GroupForm';
import GroupFormSkeleton from '@/components/pages/GroupForm/skeleton';
import { withAuth } from '@/features/auth/withAuth';
import { getAppName } from '@/lib/env';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: `그룹 생성 | ${getAppName()}`,
};

export default withAuth(function () {
  return (
    <Suspense fallback={<GroupFormSkeleton />}>
      <GroupForm />
    </Suspense>
  );
});
