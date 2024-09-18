import Loading from '@/components/Loading';
import Group from '@/components/pages/Group';
import { withAuth } from '@/lib/auth/hoc';
import { Suspense } from 'react';

export default withAuth(function () {
  return (
    <Suspense fallback={<Loading size="lg" />}>
      <Group />
    </Suspense>
  );
});
