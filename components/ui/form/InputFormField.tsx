import { ComponentProps } from 'react';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '.';
import { Input } from '../input';

export default function InputFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ className, label, inputProps, required, ...props }: Props<TFieldValues, TName>) {
  return (
    <FormField
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel aria-required={required}>{label}</FormLabel>}
          <FormControl>
            <Input {...field} {...inputProps} />
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
  inputProps?: ComponentProps<typeof Input>;
  required?: boolean;
};
