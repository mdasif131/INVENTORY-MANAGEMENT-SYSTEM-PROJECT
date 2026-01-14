import { lazy, Suspense } from 'react';
import LazyLoader from '../components/masterLayout/LazyLoader';
import { MainLayout } from '../components/masterLayout/Layout';
const Dashboard = lazy(() => import('../components/dashboard/Dashboard'));
const DashBoardPage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <Dashboard />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default DashBoardPage;
