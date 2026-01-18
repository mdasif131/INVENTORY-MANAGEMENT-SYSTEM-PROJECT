import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const BrandCreateUpdate = lazy(() => import('../../components/brand/BrandCreateUpdate'));
const BrandCreateUpdaePage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <BrandCreateUpdate />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default BrandCreateUpdaePage;
