import BiddingForm from '@/components/pages/BiddingForm';
import { withAuth } from '@/lib/auth/hoc';

export default withAuth(function ({ params }: { params: { auctionCaseId: string } }) {
  return <BiddingForm auctionCaseId={params.auctionCaseId} />;
});
