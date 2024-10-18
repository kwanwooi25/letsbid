import InvitationForm from '@/app/group/components/InvitationForm';
import Loading from '@/components/Loading';
import { withAuth } from '@/lib/auth/hoc';
import { Suspense } from 'react';

export default withAuth(function () {
  return (
    <Suspense fallback={<Loading size="lg" />}>
      <InvitationForm />
    </Suspense>
  );
});
