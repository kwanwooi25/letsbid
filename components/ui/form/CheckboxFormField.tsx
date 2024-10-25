import { cn } from '@/lib/utils';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '.';
import { Checkbox } from '../checkbox';

export default function CheckboxFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ className, label, ...props }: Props<TFieldValues, TName>) {
  return (
    <FormField
      render={({ field }) => {
        return (
          <FormItem className={cn('flex flex-col justify-center', className)}>
            <FormControl>
              <div className="flex items-center gap-2">
                <Checkbox id={props.name} onCheckedChange={field.onChange} checked={field.value} />
                <FormLabel htmlFor={props.name}>{label}</FormLabel>
              </div>
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
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & DefaultCheckboxProps;

type DefaultCheckboxProps = {
  className?: string;
  label?: string;
};
