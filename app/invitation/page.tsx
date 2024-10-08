import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import Invitation from '@/components/pages/Invitation';
import { withAuth } from '@/lib/auth/hoc';

export default withAuth(function () {
  return (
    <>
      <PageHeader title="그룹 초대 목록" className="max-w-2xl" />
      <PageBody className="max-w-2xl">
        <Invitation />
      </PageBody>
    </>
  );
});
