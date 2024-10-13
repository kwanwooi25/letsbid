import Loading from '@/components/Loading';
import InvitationForm from '@/components/pages/InvitationForm';
import { withAuth } from '@/lib/auth/hoc';
import { Suspense } from 'react';

export default withAuth(function () {
  return (
    <Suspense fallback={<Loading size="lg" />}>
      <InvitationForm />
    </Suspense>
  );
});
