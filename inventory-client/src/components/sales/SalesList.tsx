
import { useSelector } from 'react-redux';
import { GetSaleListRequest } from '../../APIRequest/SaleAPIRequest';
import { formatDate } from '../../helper/dateFormat';
import type { RootState } from '../../redux/store/store';
import DataTable from '../common/DataTable';

const SalesList = () => {
  const allsale = useSelector((state: RootState) => state.sale.List);
  const saleTotal = useSelector(
    (state: RootState) => state.sale.ListTotal,
  );

  const columns = [
    {
      key: 'name',
      label: 'CUSTOMER',
      render: (sale: any) => (
        <span className="font-semibold cursor-pointer hover:text-lg hover:text-blue-500 hoverTransition">
          {sale.customers[0].customerName}
        </span>
      ),
    },
    {
      key: 'grand',
      label: 'GRAND TOTAL',
      hidden: 'md' as const,
      render: (sale: any) => (
        <span className="text-gray-600">${sale.grandTotal}</span>
      ),
    },
    {
      key: 'suppling',
      label: 'SUPPLING COST',
      hidden: 'md' as const,
      render: (sale: any) => (
        <span className="text-gray-600">${sale.shippingCost || 'N/A'}</span>
      ),
    },

    {
      key: 'vattax',
      label: 'VAT/TAX',
      hidden: 'sm' as const,
      render: (sale: any) => (
        <span className="text-gray-600">${sale.vatTax}</span>
      ),
    },
    {
      key: 'othercost',
      label: 'OTHER COST',
      hidden: 'lg' as const,
      render: (sale: any) => (
        <span className="text-gray-600">${sale.otherCost || 'N/A'}</span>
      ),
    },
    {
      key: 'discount',
      label: 'DISCOUNT',
      hidden: 'lg' as const,
      render: (sale: any) => (
        <span className="text-gray-600">${sale.discount || '0'}</span>
      ),
    },
    {
      key: 'date',
      label: 'DATE',
      hidden: 'lg' as const,
      render: (sale: any) => (
        <span className="text-gray-600">
          {formatDate(sale.createdAt) || 'N/A'}
        </span>
      ),
    },
  ];

  const handleEdit = (sale: any) => {
    console.log('Edit sale:', sale);
  };


  return (
    <DataTable
      title="Sales List"
      columns={columns}
      data={allsale}
      total={saleTotal}
      onFetchData={GetSaleListRequest}
      onEdit={handleEdit}
      initialPerPage={20} // Custom initial per page
    />
  );
};

export default SalesList;
