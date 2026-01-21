import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const PurchaseReport = lazy(
  () => import('../../components/report/PurchaseReport'),
);
const PurchaseReportPage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <PurchaseReport />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default PurchaseReportPage;
