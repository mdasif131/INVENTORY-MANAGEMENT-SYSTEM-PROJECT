import { lazy, Suspense } from 'react';
import { MainLayout } from '../../components/masterLayout/Layout';
import LazyLoader from '../../components/masterLayout/LazyLoader';
;

const Profile = lazy(() => import('../../components/users/Profile'));
const ProfilePage = () => {
  return (
    <>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <Profile />
        </Suspense>
      </MainLayout>
    </>
  );
};

export default ProfilePage;
