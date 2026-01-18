
import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const SalesCreateUpdate = lazy(() => import('../../components/sales/SalesCreateUpdate'));
const SalesCreateUpdatePage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <SalesCreateUpdate />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default SalesCreateUpdatePage;
