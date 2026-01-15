import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const SalesList = lazy(() => import('../../components/sales/SalesList'));
const SalesListPage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <SalesList />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default SalesListPage;
