import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const ReturnList = lazy(() => import('../../components/return/ReturnList'));
const ReturnListPage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <ReturnList />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default ReturnListPage;
