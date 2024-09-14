'use client';

import { AlertProvider } from '@/context/Alert';
import { FormDialogProvider } from '@/context/FormDialog';
import { getQueryClient } from '@/queries/config';
import { QueryClientProvider } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

export default function Providers({ session, children }: Props) {
  const queryClient = getQueryClient();

  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <QueryClientProvider client={queryClient}>
          <FormDialogProvider>
            <AlertProvider>{children}</AlertProvider>
          </FormDialogProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

type Props = PropsWithChildren & {
  session: Session | null;
};
