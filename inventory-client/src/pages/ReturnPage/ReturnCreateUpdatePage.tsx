import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const ReturnCreateUpdate = lazy(() => import('../../components/return/ReturnCreateUpdate'));
const ReturnCreateUpdatePage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <ReturnCreateUpdate />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default ReturnCreateUpdatePage;
