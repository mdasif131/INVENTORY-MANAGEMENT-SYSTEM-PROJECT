import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const SaleReport = lazy(
  () => import('../../components/report/SaleReport'),
);
const SaleReportPage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <SaleReport />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default SaleReportPage;
