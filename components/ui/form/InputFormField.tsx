import { ComponentProps, ReactNode } from 'react';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '.';
import { Input } from '../input';

export default function InputFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ className, label, inputProps, required, suffix, ...props }: Props<TFieldValues, TName>) {
  return (
    <FormField
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel aria-required={required}>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Input {...field} {...inputProps} />
              {!!suffix && (
                <div className="absolute bottom-0 right-0 px-3 min-h-[40px] flex items-center text-sm text-primary/30 font-semibold">
                  {suffix}
                </div>
              )}
            </div>
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
  suffix?: ReactNode;
};
