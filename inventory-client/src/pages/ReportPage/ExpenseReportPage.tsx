import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const ExpenseReport = lazy(
  () => import('../../components/report/ExpenseReport'),
);
const ExpenseReportPage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <ExpenseReport />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default ExpenseReportPage;
