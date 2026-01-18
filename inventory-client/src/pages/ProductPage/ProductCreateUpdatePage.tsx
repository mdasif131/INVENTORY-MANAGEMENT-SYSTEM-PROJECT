import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const ProductCreateUpdate = lazy(() => import('../../components/product/ProductCreateUpdate'));
const ProductCreateUpdatePage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <ProductCreateUpdate />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default ProductCreateUpdatePage;
