import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const BrandList = lazy(() => import('../../components/brand/BrandList'));
const BrandListPage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <BrandList />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default BrandListPage;
