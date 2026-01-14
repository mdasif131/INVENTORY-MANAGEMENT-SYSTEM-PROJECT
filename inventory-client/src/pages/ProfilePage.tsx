import { lazy, Suspense } from 'react';
import MasterLoayout from '../components/masterLayout/MasterLoayout';
import LazyLoader from '../components/masterLayout/LazyLoader';

const Profile = lazy(() => import('../components/users/Profile'));
const ProfilePage = () => {
  return (
    <>
      <MasterLoayout>
        <Suspense fallback={<LazyLoader />}>
          <Profile />
        </Suspense>
      </MasterLoayout>
    </>
  );
};

export default ProfilePage;
