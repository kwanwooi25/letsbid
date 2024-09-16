import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ReactNode } from 'react';
import { Calendar, CalendarProps } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export default function DatePicker({ triggerElement, calendarProps }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>{triggerElement}</PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={ko}
          formatters={{
            formatCaption: (date) => format(date, 'yyyy년 M월'),
          }}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  );
}

type Props = {
  triggerElement: ReactNode;
  calendarProps?: CalendarProps;
};
