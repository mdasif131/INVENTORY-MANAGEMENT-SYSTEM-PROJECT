import { useSelector } from 'react-redux';
import { formatDate } from '../../helper/dateFormat';
import type { RootState } from '../../redux/store/store';
import DataTable from '../common/DataTable';
import { GetCustomerListRequest } from '../../APIRequest/CustomerAPIRequest';
import { useNavigate } from 'react-router';
import { DeleteAlert } from '../../helper/deleteAlert';

const CustomerList = () => {
  const navigate = useNavigate()
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
    const id = customer._id
    console.log('Edit customer:', customer._id);
    navigate(`/customer-create-update?id=${id}`);
    window.location.reload();
  };

const handleDelete = async (customer: any): Promise<void> => {
  const id = customer._id;
  const result = await DeleteAlert(id);

  if (result) {
    await GetCustomerListRequest(1, 20, '0');
  }
};

  return (
    <DataTable
      title="Customer List"
      columns={columns}
      data={allCustomer}
      total={customerTotal}
      onFetchData={GetCustomerListRequest}
      updateURL="/customer-create-update"
      onDelete={handleDelete}
      initialPerPage={20} // Custom initial per page
    />
  );
};

export default CustomerList;
