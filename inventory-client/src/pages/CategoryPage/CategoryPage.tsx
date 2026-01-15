import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const CategoryList = lazy(() => import('../../components/category/CategoryList'));
const CategoryListPage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <CategoryList />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default CategoryListPage;
