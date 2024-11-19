import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GNB_HEIGHT, PAGE_HEADER_HEIGHT } from '@/components/layouts/const';
import { useTabs } from '@/hooks/useTabs';
import { cn } from '@/lib/utils';

export default function TabNavigation<T extends string>({
  tabs,
  labelMap,
  breakpoint = 'lg',
}: Props<T>) {
  const { tab, handleTabChange } = useTabs<T>({ defaultTab: tabs[0] as T });
  return (
    <>
      <TabsList
        className={cn(
          'hidden flex-col gap-1 w-full h-auto',
          breakpoint === 'sm' && 'sm:flex',
          breakpoint === 'md' && 'md:flex',
          breakpoint === 'lg' && 'lg:flex',
          breakpoint === 'xl' && 'xl:flex',
          breakpoint === '2xl' && '2xl:flex',
        )}
        style={{ top: `${GNB_HEIGHT + PAGE_HEADER_HEIGHT}px` }}
      >
        {tabs.map((t) => (
          <TabsTrigger
            key={t}
            value={t}
            className={cn('w-full hover:bg-primary-foreground/70 hover:text-primary/70 py-2')}
          >
            {labelMap[t]}
          </TabsTrigger>
        ))}
      </TabsList>

      <Select value={tab} onValueChange={handleTabChange}>
        <SelectTrigger
          className={cn(
            breakpoint === 'sm' && 'sm:hidden',
            breakpoint === 'md' && 'md:hidden',
            breakpoint === 'lg' && 'lg:hidden',
            breakpoint === 'xl' && 'xl:hidden',
            breakpoint === '2xl' && '2xl:hidden',
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {tabs.map((t) => (
            <SelectItem key={t} value={t}>
              {labelMap[t]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}

type Props<T extends string> = {
  tabs: T[];
  labelMap: Record<T, string>;
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
};
