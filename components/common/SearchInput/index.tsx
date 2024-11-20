'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LucideSearch, LucideX } from 'lucide-react';
import { FormEventHandler, HTMLAttributes, useEffect, useRef, useState } from 'react';

export default function SearchInput({
  className,
  placeholder = '검색어 입력',
  defaultValue = '',
  onSearch,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(defaultValue ?? '');
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSearch?.(inputValue);
  };

  const removeInputValue = () => {
    setInputValue('');
    onSearch?.('');
    ref?.current?.focus();
  };

  useEffect(() => {
    if (ref?.current) {
      ref.current.value = defaultValue ?? '';
      setInputValue(defaultValue ?? '');
    }
  }, [defaultValue, ref]);

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="relative w-full">
        <LucideSearch className="absolute top-[50%] -translate-y-[50%] left-0 mx-3 w-4 h-4 text-primary" />
        <Input
          ref={ref}
          className="px-9"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`${placeholder} ↵`}
        />
        {!!inputValue && (
          <Button
            className="absolute top-[50%] -translate-y-[50%] right-0"
            type="button"
            variant="ghost"
            size="icon"
            onClick={removeInputValue}
          >
            <LucideX className="w-4 h-4" />
          </Button>
        )}
      </div>
    </form>
  );
}

type Props = {
  className?: HTMLAttributes<HTMLFormElement>['className'];
  placeholder?: string;
  defaultValue?: string | null;
  onSearch?: (searchTerm: string) => void;
};
