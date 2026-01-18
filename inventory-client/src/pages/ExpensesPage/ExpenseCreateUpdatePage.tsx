import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const ExpenseCreateUpdate = lazy(() => import('../../components/expense/ExpenseCreateUpdate'));
const ExpenseCreateUpdatePage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <ExpenseCreateUpdate />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default ExpenseCreateUpdatePage;
