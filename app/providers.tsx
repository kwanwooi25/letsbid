'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { AlertProvider } from '@/context/Alert';
import { FormDialogProvider } from '@/context/FormDialog';
import { getQueryClient } from '@/lib/query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
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
          <ReactQueryStreamedHydration>
            <FormDialogProvider>
              <AlertProvider>
                <TooltipProvider>{children}</TooltipProvider>
              </AlertProvider>
            </FormDialogProvider>
          </ReactQueryStreamedHydration>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

type Props = PropsWithChildren & {
  session: Session | null;
};
