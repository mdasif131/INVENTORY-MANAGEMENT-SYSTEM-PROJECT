import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const PurchaseCreateUpdate = lazy(
  () => import('../../components/purchase/PurchaseCreateUpdate'),
);
const PurchaseCreateUpdatePage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <PurchaseCreateUpdate />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default PurchaseCreateUpdatePage;
