import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '.';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';

export default function SelectFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ className, label, placeholder, selectOptions = [], ...props }: Props<TFieldValues, TName>) {
  return (
    <FormField
      render={({ field }) => {
        return (
          <FormItem className={cn('flex flex-col', className)}>
            {!!label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={<span className="opacity-50">{placeholder}</span>} />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
      {...props}
    />
  );
}

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & DefaultSelectProps;

type DefaultSelectProps = {
  type: 'default';
  className?: string;
  label?: string;
  placeholder?: string;
  selectOptions: { value: string; label: ReactNode }[];
};
