import { Chip } from '@/components/ui/chip';

export default function AcceptInvitationGuide() {
  return (
    <div className="py-4 flex flex-col gap-2">
      <h3 className="font-bold flex items-center gap-2">
        <Chip variant="success">멤버</Chip>
        <span>초대 수락</span>
      </h3>
      <div className="relative pb-[calc(75.4%)] h-0 w-full bg-primary-foreground">
        <iframe
          src="https://images.letsbid.app/tutorials/%5B%E1%84%86%E1%85%A6%E1%86%B7%E1%84%87%E1%85%A5%5D%E1%84%8E%E1%85%A9%E1%84%83%E1%85%A2%E1%84%89%E1%85%AE%E1%84%85%E1%85%A1%E1%86%A8.mp4"
          title="[멤버] 초대 수락"
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
