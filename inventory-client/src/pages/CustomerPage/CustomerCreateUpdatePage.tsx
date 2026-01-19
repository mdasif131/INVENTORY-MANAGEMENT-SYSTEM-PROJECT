import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const CustomerCreateUpdate = lazy(
  () => import('../../components/customer/CustomerCreateUpdate'),
);
const CustomerCreateUpdatePage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <CustomerCreateUpdate />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default CustomerCreateUpdatePage;
