import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import UserProfileHeaderButtons from './HeaderButtons';
import UserDetail from './UserDetail';

export default function UserProfile() {
  return (
    <>
      <PageHeader className="max-w-lg" title="내 정보">
        <UserProfileHeaderButtons />
      </PageHeader>
      <PageBody className="max-w-lg">
        <UserDetail />
      </PageBody>
    </>
  );
}
