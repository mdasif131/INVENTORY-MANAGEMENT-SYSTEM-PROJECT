import { lazy, Suspense } from 'react';
import LazyLoader from '../components/masterLayout/LazyLoader';
const Dashboard = lazy(() => import('../components/dashboard/Dashboard'));
const DashBoardPage = () => {
  return (
    <div>
      <Suspense fallback={<LazyLoader />}>
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default DashBoardPage;
