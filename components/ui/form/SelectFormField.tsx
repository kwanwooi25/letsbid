import ProductOptionSelect from '@/components/ProductOptionSelect';
import SalesChannelSelect from '@/components/SalesChannelSelect';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '.';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';

export default function SelectFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  type = 'default',
  className,
  label,
  placeholder,
  selectOptions = [],
  onChange = () => {},
  ...props
}: Props<TFieldValues, TName>) {
  return (
    <FormField
      render={({ field }) => {
        if (type === 'productOption') {
          return (
            <FormItem className={cn('flex flex-col', className)}>
              <FormLabel className="h-[24px] flex items-center">{label}</FormLabel>
              <FormControl>
                <ProductOptionSelect value={field.value} onChange={onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }

        if (type === 'salesChannel') {
          return (
            <FormItem className="flex flex-col">
              <FormLabel className="h-[24px] flex items-center">판매처</FormLabel>
              <FormControl>
                <SalesChannelSelect value={field.value} onChange={onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }

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
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> &
  (DefaultSelectProps | ProductOptionSelectProps | SalesChannelSelectProps);

type DefaultSelectProps = {
  type: 'default';
  className?: string;
  label?: string;
  placeholder?: string;
  selectOptions: { value: string; label: ReactNode }[];
  onChange?: never;
};

type ProductOptionSelectProps = {
  type: 'productOption';
  className?: string;
  label?: string;
  placeholder?: never;
  selectOptions?: never;
  onChange?: (productOptionId: string) => void;
};

type SalesChannelSelectProps = {
  type: 'salesChannel';
  className?: string;
  label?: string;
  placeholder?: never;
  selectOptions?: never;
  onChange?: (salesChannelId: string) => void;
};
