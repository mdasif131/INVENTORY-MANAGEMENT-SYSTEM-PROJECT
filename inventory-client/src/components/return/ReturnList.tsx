import { useSelector } from 'react-redux';
import { GetReturnListRequest } from '../../APIRequest/ReturnAPIRequest';
import { formatDate } from '../../helper/dateFormat';
import type { RootState } from '../../redux/store/store';
import DataTable from '../common/DataTable';

const retrunsList = () => {
  const allretrun = useSelector((state: RootState) => state.return.List);
  const retrunTotal = useSelector((state: RootState) => state.return.ListTotal);

  const columns = [
    {
      key: 'name',
      label: 'CUSTOMER',
      render: (retrun: any) => (
        <span className="font-semibold cursor-pointer hover:text-lg hover:text-blue-500 hoverTransition">
          {retrun.customers[0].customerName}
        </span>
      ),
    },
    {
      key: 'grand',
      label: 'GRAND TOTAL',
      hidden: 'md' as const,
      render: (retrun: any) => (
        <span className="text-gray-600">${retrun.grandTotal}</span>
      ),
    },
    {
      key: 'suppling',
      label: 'SUPPLING COST',
      hidden: 'md' as const,
      render: (retrun: any) => (
        <span className="text-gray-600">${retrun.shippingCost || 'N/A'}</span>
      ),
    },

    {
      key: 'vattax',
      label: 'VAT/TAX',
      hidden: 'sm' as const,
      render: (retrun: any) => (
        <span className="text-gray-600">${retrun.vatTax}</span>
      ),
    },
    {
      key: 'othercost',
      label: 'OTHER COST',
      hidden: 'lg' as const,
      render: (retrun: any) => (
        <span className="text-gray-600">${retrun.otherCost || 'N/A'}</span>
      ),
    },
    {
      key: 'discount',
      label: 'DISCOUNT',
      hidden: 'lg' as const,
      render: (retrun: any) => (
        <span className="text-gray-600">${retrun.discount || '0'}</span>
      ),
    },
    {
      key: 'date',
      label: 'DATE',
      hidden: 'lg' as const,
      render: (retrun: any) => (
        <span className="text-gray-600">
          {formatDate(retrun.createdAt) || 'N/A'}
        </span>
      ),
    },
  ];

  const handleEdit = (retrun: any) => {
    console.log('Edit retrun:', retrun);
  };

  const handleDelete = (retrun: any) => {
    console.log('Delete retrun:', retrun);
  };

  return (
    <DataTable
      title="Retruns List"
      columns={columns}
      data={allretrun}
      total={retrunTotal}
      onFetchData={GetReturnListRequest}
      onEdit={handleEdit}
      onDelete={handleDelete}
      initialPerPage={20} // Custom initial per page
    />
  );
};

export default retrunsList;
