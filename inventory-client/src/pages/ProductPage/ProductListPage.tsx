import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const ProductList = lazy(() => import('../../components/product/ProductList'));
const ProductListPage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <ProductList />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default ProductListPage;
