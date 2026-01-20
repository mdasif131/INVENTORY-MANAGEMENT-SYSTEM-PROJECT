
// expensTypeList Using the reusable component
import { useSelector } from 'react-redux';

import { DeleteExpenseTypeRequest, GetExpensesTypeListRequest } from '../../APIRequest/ExpenseTypeAPIRequest';
import { formatDate } from '../../helper/dateFormat';
import type { RootState } from '../../redux/store/store';
import DataTable from '../common/DataTable';
import { DeleteAlert } from '../../helper/deleteAlert';

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

  // const handleEdit = (expensType: any) => {
  //   console.log('Edit expensType:', expensType);
  // };

  const handleDelete =async (expensType: any) => {
     const id = expensType._id;
        const result = await DeleteAlert(id, DeleteExpenseTypeRequest, {
          entityName: 'Expense Type',
          title: 'Delete Expense Type?',
          confirmButtonText: 'Yes, delete expense type!',
        });
    
        if (result) {
          await GetExpensesTypeListRequest(1, 20, '0');
        }
  };

  return (
    <DataTable
      title="Expense Type List"
      columns={columns}
      data={allexpensType}
      total={expensTypeTotal}
      onFetchData={GetExpensesTypeListRequest}
      updateURL="/expensetype-create-update"
      onDelete={handleDelete}
    />
  );
};

export default ExpenseTypeList;