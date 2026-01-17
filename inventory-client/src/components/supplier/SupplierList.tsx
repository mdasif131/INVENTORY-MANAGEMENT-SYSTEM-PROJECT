
import { useSelector } from 'react-redux';
import { GetSupplierListRequest } from '../../APIRequest/SupplierAPIRequest';
import { formatDate } from '../../helper/dateFormat';
import type { RootState } from '../../redux/store/store';
import DataTable from '../common/DataTable';

const SupplierList = () => {
  const allsupplier = useSelector((state: RootState) => state.supplier.List);
  const supplierTotal = useSelector(
    (state: RootState) => state.supplier.ListTotal,
  );

  const columns = [
    {
      key: 'name',
      label: 'SUPPLIER NAME',
      render: (supplier: any) => (
        <span className="font-semibold hover:text-blue-500 hoverTransition">
          {supplier.name}
        </span>
      ),
    },
    {
      key: 'email',
      label: 'EMAIL',
      hidden: 'md' as const,
      render: (supplier: any) => (
        <span className="text-gray-600">{supplier.email}</span>
      ),
    },
    {
      key: 'phone',
      label: 'PHONE',
      hidden: 'md' as const,
      render: (supplier: any) => (
        <span className="text-gray-600">{supplier.phone || 'N/A'}</span>
      ),
    },
    {
      key: 'address',
      label: 'ADDRESS',
      hidden: 'lg' as const,
      render: (supplier: any) => (
        <span className="text-gray-600">{supplier.address || 'N/A'}</span>
      ),
    },
    {
      key: 'createdAt',
      label: 'CREATED',
      hidden: 'sm' as const,
      render: (supplier: any) => (
        <span className="text-gray-600">{formatDate(supplier.createdAt)}</span>
      ),
    },
  ];

  const handleEdit = (supplier: any) => {
    console.log('Edit supplier:', supplier);
  };

  const handleDelete = (supplier: any) => {
    console.log('Delete supplier:', supplier);
  };

  return (
    <DataTable
      title="supplier List"
      columns={columns}
      data={allsupplier}
      total={supplierTotal}
      onFetchData={GetSupplierListRequest}
      onEdit={handleEdit}
      onDelete={handleDelete}
      initialPerPage={20} // Custom initial per page
    />
  );
};

export default SupplierList;
