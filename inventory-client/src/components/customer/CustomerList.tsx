import { useSelector } from 'react-redux';
import { formatDate } from '../../helper/dateFormat';
import type { RootState } from '../../redux/store/store';
import DataTable from '../common/DataTable';
import { GetCustomerListRequest } from '../../APIRequest/CustomerAPIRequest';

const CustomerList = () => {
  const allCustomer = useSelector((state: RootState) => state.customer.List);
  const customerTotal = useSelector(
    (state: RootState) => state.customer.ListTotal,
  );

  const columns = [
    {
      key: 'name',
      label: 'CUSTOMER NAME',
      render: (customer: any) => (
        <span className="font-semibold cursor-pointer hover:text-lg hover:text-blue-500 hoverTransition">
          {customer.customerName}
        </span>
      ),
    },
    {
      key: 'email',
      label: 'EMAIL',
      hidden: 'md' as const,
      render: (customer: any) => (
        <span className="text-gray-600">{customer.email}</span>
      ),
    },
    {
      key: 'phone',
      label: 'PHONE',
      hidden: 'md' as const,
      render: (customer: any) => (
        <span className="text-gray-600">{customer.phone || 'N/A'}</span>
      ),
    },
    {
      key: 'address',
      label: 'ADDRESS',
      hidden: 'lg' as const,
      render: (customer: any) => (
        <span className="text-gray-600">{customer.address || 'N/A'}</span>
      ),
    },
    {
      key: 'createdAt',
      label: 'CREATED',
      hidden: 'sm' as const,
      render: (customer: any) => (
        <span className="text-gray-600">{formatDate(customer.createdAt)}</span>
      ),
    },
  ];

  const handleEdit = (customer: any) => {
    console.log('Edit customer:', customer);
  };

  const handleDelete = (customer: any) => {
    console.log('Delete customer:', customer);
  };

  return (
    <DataTable
      title="Customer List"
      columns={columns}
      data={allCustomer}
      total={customerTotal}
      onFetchData={GetCustomerListRequest}
      onEdit={handleEdit}
      onDelete={handleDelete}
      initialPerPage={20} // Custom initial per page
    />
  );
};

export default CustomerList;
