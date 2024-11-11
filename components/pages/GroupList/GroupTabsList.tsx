import { TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function GroupTabsList() {
  return (
    <TabsList className="w-full">
      <TabsTrigger className="w-full" value="myGroups">
        참여중인 그룹
      </TabsTrigger>
      <TabsTrigger className="w-full" value="all">
        참여 가능한 그룹
      </TabsTrigger>
      <TabsTrigger className="w-full" value="archived">
        숨겨진 그룹
      </TabsTrigger>
    </TabsList>
  );
}
