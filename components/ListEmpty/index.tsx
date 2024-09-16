import { PropsWithChildren } from 'react';

export default function ListEmpty({ children, message }: Props) {
  return (
    <div className="py-6 px-4 text-center text-lg font-bold text-primary/70">
      {children ?? message}
    </div>
  );
}

type Props = PropsWithChildren & {
  message?: string;
};
