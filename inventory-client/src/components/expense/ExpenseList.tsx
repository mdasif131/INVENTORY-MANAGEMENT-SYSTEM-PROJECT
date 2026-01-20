
import { useSelector } from 'react-redux';
import { DeleteExpenseRequest, GetExpensesListRequest } from '../../APIRequest/ExpenseAPIRequest';
import { DeleteAlert } from '../../helper/deleteAlert';
import type { RootState } from '../../redux/store/store';
import DataTable from '../common/DataTable';

const ExpenseList = () => {
  const allexpense = useSelector((state: RootState) => state.expense.List);
  const expenseTotal = useSelector(
    (state: RootState) => state.expense.ListTotal,
  );

  const columns = [
    {
      key: 'name',
      label: 'Type',
      render: (expense: any) => (
        <span className="font-semibold cursor-pointer hover:text-lg hover:text-blue-500 hoverTransition">
          {expense.type[0].name}
        </span>
      ),
    },
    {
      key: 'amount',
      label: 'AMOUNT',
      hidden: 'md' as const,
      render: (expense: any) => (
        <span className="text-gray-600">{expense.amount}</span>
      ),
    },
    {
      key: 'note',
      label: 'NOTE',
      hidden: 'md' as const,
      render: (expense: any) => (
        <span className="text-gray-600">{expense.note || 'N/A'}</span>
      ),
    },
  ];

  // const handleEdit = (expense: any) => {
  //   console.log('Edit expense:', expense);
  // };

  const handleDelete = async (expense: any) => {
    const id = expense._id;
    const result = await DeleteAlert(id, DeleteExpenseRequest, {
      entityName: 'Expense',
      title: 'Delete Expense?',
      confirmButtonText: 'Yes, delete expense!',
    });

    if (result) {
      await GetExpensesListRequest(1, 20, '0');
    }
  };
  return (
    <DataTable
      title="Expense List"
      columns={columns}
      data={allexpense}
      total={expenseTotal}
      onFetchData={GetExpensesListRequest}
      updateURL="/expense-create-update"
      onDelete={handleDelete}
      initialPerPage={20} // Custom initial per page
    />
  );
};

export default ExpenseList;
