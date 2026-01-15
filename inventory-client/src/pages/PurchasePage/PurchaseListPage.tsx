import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const PurchaseList = lazy(() => import('../../components/purchase/PurchaseList'));
const PurchaseListPage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <PurchaseList />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default PurchaseListPage;
