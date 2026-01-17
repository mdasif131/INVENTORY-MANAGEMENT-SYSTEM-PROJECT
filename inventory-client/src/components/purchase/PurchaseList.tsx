import { useSelector } from 'react-redux';
import { GetPurchaseListRequest } from '../../APIRequest/PurchasesAPIRequest';
import { formatDate } from '../../helper/dateFormat';
import type { RootState } from '../../redux/store/store';
import DataTable from '../common/DataTable';

const PurchaseList = () => {
  const allpurchase = useSelector((state: RootState) => state.purchase.List);
  const purchaseTotal = useSelector(
    (state: RootState) => state.purchase.ListTotal,
  );

  const columns = [
    {
      key: 'name',
      label: 'SUPPLIER',
      render: (purchase: any) => (
        <span className="font-semibold hover:text-blue-500 hoverTransition">
          {purchase.suppliers[0].name}
        </span>
      ),
    },
    {
      key: 'grand',
      label: 'GRAND TOTAL',
      hidden: 'md' as const,
      render: (purchase: any) => (
        <span className="text-gray-600">${purchase.grandTotal}</span>
      ),
    },
    {
      key: 'suppling',
      label: 'SUPPLING COST',
      hidden: 'md' as const,
      render: (purchase: any) => (
        <span className="text-gray-600">${purchase.shippingCost || 'N/A'}</span>
      ),
    },

    {
      key: 'vattax',
      label: 'VAT/TAX',
      hidden: 'sm' as const,
      render: (purchase: any) => (
        <span className="text-gray-600">${purchase.vatTax}</span>
      ),
    },
    {
      key: 'othercost',
      label: 'OTHER COST',
      hidden: 'lg' as const,
      render: (purchase: any) => (
        <span className="text-gray-600">${purchase.otherCost || 'N/A'}</span>
      ),
    },
    {
      key: 'discount',
      label: 'DISCOUNT',
      hidden: 'lg' as const,
      render: (purchase: any) => (
        <span className="text-gray-600">${purchase.discount || '0'}</span>
      ),
    },
    {
      key: 'date',
      label: 'DATE',
      hidden: 'lg' as const,
      render: (purchase: any) => (
        <span className="text-gray-600">
          {formatDate(purchase.createdAt) || 'N/A'}
        </span>
      ),
    },
  ];

  const handleEdit = (purchase: any) => {
    console.log('Edit purchase:', purchase);
  };

  const handleDelete = (purchase: any) => {
    console.log('Delete purchase:', purchase);
  };

  return (
    <DataTable
      title="Purchase List"
      columns={columns}
      data={allpurchase}
      total={purchaseTotal}
      onFetchData={GetPurchaseListRequest}
      onEdit={handleEdit}
      onDelete={handleDelete}
      initialPerPage={20} // Custom initial per page
    />
  );
};

export default PurchaseList;
