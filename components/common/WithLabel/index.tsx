import { PropsWithChildren, ReactNode } from 'react';
import { Label } from '../../ui/label';

export default function WithLabel({ children, label, required }: Props) {
  return (
    <div className="space-y-2">
      {typeof label === 'string' ? (
        <Label>
          <span>{label}</span>
          {required && <span className="pl-1 text-destructive font-bold text-[16px]">*</span>}
        </Label>
      ) : (
        label
      )}
      {children}
    </div>
  );
}

type Props = PropsWithChildren & {
  label: ReactNode;
  required?: boolean;
};
