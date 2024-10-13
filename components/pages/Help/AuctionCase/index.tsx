import { Chip } from '@/components/ui/chip';

export default function AuctionCaseHelp() {
  return (
    <div className="py-4 flex flex-col gap-2">
      <h3 className="font-bold flex items-center gap-2">
        <Chip variant="destruptive">리더</Chip>
        <span>경매 사건 등록 / 수정 / 삭제</span>
      </h3>
      <div className="relative pb-[calc(75.4%)] h-0 w-full bg-primary-foreground">
        <iframe
          src="https://images.letsbid.app/tutorials/%5B%E1%84%85%E1%85%B5%E1%84%83%E1%85%A5%5D%E1%84%80%E1%85%A7%E1%86%BC%E1%84%86%E1%85%A2%E1%84%89%E1%85%A1%E1%84%80%E1%85%A5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%85%E1%85%A9%E1%86%A8_%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC_%E1%84%89%E1%85%A1%E1%86%A8%E1%84%8C%E1%85%A6.mp4"
          title="[리더] 경매 사건 등록 / 수정 / 삭제"
          loading="lazy"
          allowFullScreen
          allow="clipboard-write"
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            width: 'calc(100% - 20px)',
            height: 'calc(100% - 20px)',
            colorScheme: 'inherit',
          }}
        />
      </div>
    </div>
  );
}
