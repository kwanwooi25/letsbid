import AuctionCaseForm from '@/components/pages/AuctionCaseForm';
import { withAuth } from '@/features/auth/withAuth';

export default withAuth(function ({ params: { groupId } }: { params: { groupId: string } }) {
  return <AuctionCaseForm groupId={groupId} />;
});
