import AuctionCaseForm from '@/components/pages/AuctionCaseForm';
import { withAuth } from '@/lib/auth/hoc';

export default withAuth(function ({ params: { groupId } }: { params: { groupId: string } }) {
  return <AuctionCaseForm groupId={groupId} />;
});
