import { Chip } from '@/components/ui/chip';

export default function BidHelp() {
  return (
    <div className="py-4 flex flex-col gap-2">
      <h3 className="font-bold flex items-center gap-2">
        <Chip>전체</Chip>
        <span>입찰표 제출 / 수정 / 취소</span>
      </h3>
      <div className="relative pb-[calc(75.4%)] h-0 w-full bg-primary-foreground">
        <iframe
          src="https://images.letsbid.app/tutorials/%5B%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%8E%E1%85%A6%5D%E1%84%8B%E1%85%B5%E1%86%B8%E1%84%8E%E1%85%A1%E1%86%AF%E1%84%8C%E1%85%A6%E1%84%8E%E1%85%AE%E1%86%AF_%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC_%E1%84%89%E1%85%A1%E1%86%A8%E1%84%8C%E1%85%A6.mp4"
          title="[전체] 입찰표 제출 / 수정 / 취소"
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
