import { cn } from '@/lib/utils';
import { InvitationResult } from '@/types/invitation';
import { LucideCheckCircle, LucideXCircle } from 'lucide-react';

export default function InvitationResultDisplay({ invitationResult }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {invitationResult.map(({ result, email, message }, index) => (
        <li
          key={email}
          className={cn(
            'flex flex-col py-4',
            result === 'SUCCESS' && 'text-green-600',
            result === 'FAIL' && 'text-destructive',
            index < invitationResult.length - 1 && 'border-b',
          )}
        >
          <div className="flex items-center gap-2">
            {result === 'SUCCESS' ? <LucideCheckCircle /> : <LucideXCircle />}
            <span className="text-lg font-bold">{email}</span>
          </div>
          <span className="self-end text-sm font-semibold text-primary/50">{message}</span>
        </li>
      ))}
    </ul>
  );
}

type Props = {
  invitationResult: InvitationResult;
};
