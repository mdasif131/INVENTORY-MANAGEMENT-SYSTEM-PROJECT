import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const SupplerCreateUpdate = lazy(
  () => import('../../components/supplier/SupplierCreateUpdate'),
);
const SupplierCreateUpdatePage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <SupplerCreateUpdate />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default SupplierCreateUpdatePage;
