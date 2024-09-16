'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ReceivedInvitationList from './ReceivedInvitationList';
import SentInvitationList from './SentInvitationList';

export default function Invitation({ tab = 'received' }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTabChange: Parameters<typeof Tabs>[0]['onValueChange'] = (value) => {
    const newSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
    newSearchParams.set('tab', value);
    const query = newSearchParams.toString();
    const url = `${pathname}?${query}`;
    router.replace(url);
  };

  return (
    <Tabs defaultValue={tab} onValueChange={handleTabChange}>
      <TabsList className="w-full">
        <TabsTrigger className="w-full" value="received">
          받은 초대
        </TabsTrigger>
        <TabsTrigger className="w-full" value="sent">
          보낸 초대
        </TabsTrigger>
      </TabsList>

      <Suspense fallback={<div>Loading...</div>}>
        <TabsContent value="received">
          <ReceivedInvitationList />
        </TabsContent>
        <TabsContent value="sent">
          <SentInvitationList />
        </TabsContent>
      </Suspense>
    </Tabs>
  );
}

type Props = {
  tab: 'received' | 'sent';
};
