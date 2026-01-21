import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const ReturnReport = lazy(
  () => import('../../components/report/ReturnReport'),
);
const ReturnReportPage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <ReturnReport />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default ReturnReportPage;
