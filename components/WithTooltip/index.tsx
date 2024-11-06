import { PropsWithChildren, ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function WithTooltip({ children, tooltip }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}

type Props = PropsWithChildren & {
  tooltip: ReactNode;
};
