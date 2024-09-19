import PageBody from '../PageBody';
import PageHeader from '../PageHeader';
import UserDetail from './UserDetail';

export default function UserProfile() {
  return (
    <>
      <PageHeader className="max-w-lg" title="사용자 정보">
        {/* <UserProfileHeaderButtons /> */}
      </PageHeader>
      <PageBody className="max-w-lg">
        <UserDetail />
      </PageBody>
    </>
  );
}
