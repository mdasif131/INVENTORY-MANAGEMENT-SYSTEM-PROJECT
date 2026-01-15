import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const CustomerList = lazy(
  () => import('../../components/customer/CustomerList')
);
const CustomerListPage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <CustomerList />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default CustomerListPage;
