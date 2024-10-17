import { Chip } from '@/components/ui/chip';

export default function BidResultChangeGuide() {
  return (
    <div className="py-4 flex flex-col gap-2">
      <h3 className="font-bold flex items-center gap-2">
        <Chip variant="destruptive">리더</Chip>
        <span>입찰 제외 처리</span>
      </h3>
      <div className="relative pb-[calc(75.4%)] h-0 w-full bg-primary-foreground">
        <iframe
          src="https://images.letsbid.app/tutorials/%5B%E1%84%85%E1%85%B5%E1%84%83%E1%85%A5%5D%E1%84%8B%E1%85%B5%E1%86%B8%E1%84%8E%E1%85%A1%E1%86%AF%E1%84%8C%E1%85%A6%E1%84%8B%E1%85%AC%E1%84%8E%E1%85%A5%E1%84%85%E1%85%B5.mp4"
          title="[리더] 입찰 제외 처리"
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
