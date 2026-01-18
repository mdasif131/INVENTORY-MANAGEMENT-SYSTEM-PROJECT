import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const CategoryCreateUpdate = lazy(
  () => import('../../components/category/CategoryCreateUpdate'),
);
const CategoryCreateUpdatePage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <CategoryCreateUpdate />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default CategoryCreateUpdatePage;
