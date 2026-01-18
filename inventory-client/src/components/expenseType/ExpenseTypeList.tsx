
// expensTypeList Using the reusable component
import { useSelector } from 'react-redux';

import { GetExpensesTypeListRequest } from '../../APIRequest/ExpenseTypeAPIRequest';
import { formatDate } from '../../helper/dateFormat';
import type { RootState } from '../../redux/store/store';
import DataTable from '../common/DataTable';

const ExpenseTypeList = () => {
  const allexpensType = useSelector(
    (state: RootState) => state.expensetype.List,
  );
  const expensTypeTotal = useSelector(
    (state: RootState) => state.expensetype.ListTotal,
  );

  const columns = [
    {
      key: 'name',
      label: 'NAME',
      render: (expensType: any) => (
        <span className="font-semibold cursor-pointer hover:text-lg hover:text-blue-500 hoverTransition">
          {expensType.name}
        </span>
      ),
    },

    {
      key: 'createdAt',
      label: 'CREATED',
      hidden: 'sm' as const,
      render: (expensType: any) => (
        <span className="text-gray-600">
          {formatDate(expensType.createdAt)}
        </span>
      ),
    },
  ];

  const handleEdit = (expensType: any) => {
    console.log('Edit expensType:', expensType);
  };

  const handleDelete = (expensType: any) => {
    console.log('Delete expensType:', expensType);
  };

  return (
    <DataTable
      title="Expense Type List"
      columns={columns}
      data={allexpensType}
      total={expensTypeTotal}
      onFetchData={GetExpensesTypeListRequest}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default ExpenseTypeList;