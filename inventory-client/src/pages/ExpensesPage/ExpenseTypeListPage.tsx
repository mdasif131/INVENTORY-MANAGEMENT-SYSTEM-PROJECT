import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const ExpenseTypeList = lazy(() => import('../../components/expenseType/ExpenseTypeList'));
const ExpenseTypeListPage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <ExpenseTypeList />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default ExpenseTypeListPage;
