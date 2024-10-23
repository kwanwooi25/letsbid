import GroupForm from '@/app/group/components/GroupForm';
import { withAuth } from '@/lib/auth/hoc';
import { Suspense } from 'react';
import GroupFormSkeleton from '../components/GroupForm/skeleton';

export default withAuth(function () {
  return (
    <Suspense fallback={<GroupFormSkeleton />}>
      <GroupForm />
    </Suspense>
  );
});
