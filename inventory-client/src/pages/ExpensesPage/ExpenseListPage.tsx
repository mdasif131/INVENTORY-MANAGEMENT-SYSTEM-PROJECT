import { lazy, Suspense } from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
import { MainLayout } from '../../components/masterLayout/Layout';
const ExpenseList = lazy(
  () => import('../../components/expense/ExpenseList')
);
const ExpenseListPage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<LazyLoader />}>
          <ExpenseList />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default ExpenseListPage;
