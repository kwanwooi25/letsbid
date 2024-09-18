import { LucideCrown } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';

export default function HostBadge() {
  return (
    <Avatar>
      <AvatarFallback>
        <LucideCrown className="w-4 h-4 text-yellow-500" />
      </AvatarFallback>
    </Avatar>
  );
}
