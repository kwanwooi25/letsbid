import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import { GROUP_LIST_TABS, GROUP_LIST_TABS_TRANSLATIONS, useGroupTabs } from './useGroupTabs';

export default function GroupTabsList({ className }: Props) {
  const { tab, handleTabChange } = useGroupTabs();
  return (
    <>
      <TabsList
        className={cn(
          'hidden w-full lg:flex lg:flex-col lg:h-auto lg:w-auto lg:sticky lg:top-[140px]',
          className,
        )}
      >
        {GROUP_LIST_TABS.map((t) => (
          <TabsTrigger
            key={t}
            value={t}
            className="w-full hover:bg-primary-foreground/70 hover:text-primary/70 lg:py-2"
          >
            {GROUP_LIST_TABS_TRANSLATIONS[t]}
          </TabsTrigger>
        ))}
      </TabsList>

      <Select value={tab} onValueChange={handleTabChange}>
        <SelectTrigger className="lg:hidden">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {GROUP_LIST_TABS.map((t) => (
            <SelectItem key={t} value={t}>
              {GROUP_LIST_TABS_TRANSLATIONS[t]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}

type Props = {
  className?: HTMLAttributes<HTMLDivElement>['className'];
};
