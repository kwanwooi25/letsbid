import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GROUP_MEMBER_ROLE } from '@/features/group/const';
import { getMinimumUserRole } from '@/features/group/utils';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { USER_ROLES_SELECT_OPTIONS } from './const';

export default function UserRolesSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ className, label, placeholder, ...props }: Props<TFieldValues, TName>) {
  return (
    <FormField
      render={({ field }) => {
        const displayValue = getMinimumUserRole(field.value);
        const handleValueChange = (value: TFieldValues[TName]) => {
          field.onChange(GROUP_MEMBER_ROLE[value]);
        };
        return (
          <FormItem className={className}>
            {!!label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Select onValueChange={handleValueChange} value={displayValue}>
                <SelectTrigger>
                  <SelectValue placeholder={<span className="opacity-50">{placeholder}</span>} />
                </SelectTrigger>
                <SelectContent>
                  {USER_ROLES_SELECT_OPTIONS.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
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
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
  label?: string;
  className?: string;
  placeholder?: string;
};
