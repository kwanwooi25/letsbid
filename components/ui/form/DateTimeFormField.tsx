import { cn } from '@/lib/utils';
import { ko } from 'date-fns/locale';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '.';
import { DateTimePicker } from '../datetime-picker';

export default function DateTimeFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ className, label, hourCycle = 12, ...props }: Props<TFieldValues, TName>) {
  return (
    <FormField
      render={({ field }) => (
        <FormItem className={cn('flex flex-col w-auto', className)}>
          {!!label && <FormLabel className="h-[24px] flex items-center w-auto">{label}</FormLabel>}
          <FormControl>
            <DateTimePicker
              locale={ko}
              value={field.value}
              onChange={field.onChange}
              granularity="minute"
              placeholder={`${label} 선택`}
              hourCycle={hourCycle}
              displayFormat={{
                hour12: 'yyyy년 MM월 dd일 b hh:mm',
                hour24: 'yyyy년 MM월 dd일 HH:mm',
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      {...props}
    />
  );
}

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
  className?: string;
  label?: string;
  hourCycle?: 12 | 24;
};
