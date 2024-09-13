import { cn } from '@/lib/utils';

export default function Divider({ className }: Props) {
  return <div className={cn('my-4 border-b', className)} />;
}

type Props = {
  className?: string;
};
