import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const ExpenseTypeCreateUpdate = lazy(
  () => import('../../components/expenseType/ExpenseTypeCreateUpdate'),
);
const ExpenseTypeCreateUpdatePage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <ExpenseTypeCreateUpdate />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default ExpenseTypeCreateUpdatePage;
