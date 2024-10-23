import AuctionCaseForm from '@/app/group/[groupId]/auction-case/components/AuctionCaseForm';
import { withAuth } from '@/lib/auth/hoc';

export default withAuth(function ({ params: { groupId } }: { params: { groupId: string } }) {
  return <AuctionCaseForm groupId={groupId} />;
});
