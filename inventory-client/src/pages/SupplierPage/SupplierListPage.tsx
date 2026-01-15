import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const SupplierList = lazy(() => import('../../components/supplier/SupplierList'));
const SupplierListPage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <SupplierList />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default SupplierListPage;
