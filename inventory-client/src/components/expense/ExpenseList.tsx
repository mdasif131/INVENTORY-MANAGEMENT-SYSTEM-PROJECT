
import { useSelector } from 'react-redux';
import { GetExpensesListRequest } from '../../APIRequest/ExpenseAPIRequest';
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
        <span className="font-semibold hover:text-blue-500 hoverTransition">
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

  const handleEdit = (expense: any) => {
    console.log('Edit expense:', expense);
  };

  const handleDelete = (expense: any) => {
    console.log('Delete expense:', expense);
  };

  return (
    <DataTable
      title="Expense List"
      columns={columns}
      data={allexpense}
      total={expenseTotal}
      onFetchData={GetExpensesListRequest}
      onEdit={handleEdit}
      onDelete={handleDelete}
      initialPerPage={20} // Custom initial per page
    />
  );
};

export default ExpenseList;
