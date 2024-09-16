import { Button } from '@/components/ui/button';
import { useFormDialog } from '@/context/FormDialog';
import { LucideFilePlus2 } from 'lucide-react';

export default function AuctionCaseList({ isHost, groupId }: Props) {
  const { openForm } = useFormDialog();

  const handleClickAddCase = () => {
    openForm({ type: 'AUCTION_CASE', formProps: { groupId } });
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      {isHost && (
        <Button className="self-end" onClick={handleClickAddCase}>
          <LucideFilePlus2 className="w-4 h-4 mr-2" />
          경매 사건 추가
        </Button>
      )}

      <ul className="flex flex-col gap-4"></ul>
    </div>
  );
}

type Props = {
  isHost?: boolean;
  groupId: string;
};
