import GroupForm from '@/components/pages/GroupForm';
import GroupFormSkeleton from '@/components/pages/GroupForm/skeleton';
import { withAuth } from '@/features/auth/withAuth';
import { Suspense } from 'react';

export default withAuth(function () {
  return (
    <Suspense fallback={<GroupFormSkeleton />}>
      <GroupForm />
    </Suspense>
  );
});
