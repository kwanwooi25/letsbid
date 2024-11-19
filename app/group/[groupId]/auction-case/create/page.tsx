import AuctionCaseForm from '@/components/pages/AuctionCaseForm';
import { withAuth } from '@/features/auth/hoc';

export default withAuth(function ({ params: { groupId } }: { params: { groupId: string } }) {
  return <AuctionCaseForm groupId={groupId} />;
});
