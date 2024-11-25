import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '.';
import { Button } from '../button';
import DatePicker from '../date-picker';
import Icon from '../icon';

export default function DateFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ className, label, ...props }: Props<TFieldValues, TName>) {
  return (
    <FormField
      render={({ field }) => (
        <FormItem className={cn('flex flex-col w-auto', className)}>
          {!!label && <FormLabel className="h-[24px] flex items-center w-auto">{label}</FormLabel>}
          <FormControl>
            <DatePicker
              triggerElement={
                <FormControl>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'max-w-[240px] pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {field.value ? format(field.value, 'yyyy-MM-dd') : <span>{label} 선택</span>}
                    <Icon name="calendar" className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              }
              calendarProps={{
                mode: 'single',
                selected: field.value,
                onSelect: field.onChange,
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
};
