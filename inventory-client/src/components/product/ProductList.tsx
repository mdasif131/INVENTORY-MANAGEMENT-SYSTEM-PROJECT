
import { useSelector } from 'react-redux';
import { GetProductListRequest } from '../../APIRequest/ProductAPIRequest';
import { formatDate } from '../../helper/dateFormat';
import type { RootState } from '../../redux/store/store';
import DataTable from '../common/DataTable';

const ProductList = () => {
  const allproduct = useSelector((state: RootState) => state.product.List);
  const productTotal = useSelector(
    (state: RootState) => state.product.ListTotal,
  );

  const columns = [
    {
      key: 'name',
      label: 'NAME',
      render: (product: any) => (
        <span className="font-semibold cursor-pointer hover:text-lg hover:text-blue-500 hoverTransition">
          {product.name}
        </span>
      ),
    },
    {
      key: 'unit',
      label: 'UNIT',
      hidden: 'md' as const,
      render: (product: any) => (
        <span className="text-gray-600">{product.unit}</span>
      ),
    },
    {
      key: 'brand',
      label: 'BRAND',
      hidden: 'md' as const,
      render: (product: any) => (
        <span className="text-gray-600">{product.brands[0].name || 'N/A'}</span>
      ),
    },
    {
      key: 'category',
      label: 'CATEGORY',
      hidden: 'lg' as const,
      render: (product: any) => (
        <span className="text-gray-600">
          {product.categories[0].name || 'N/A'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'CREATED',
      hidden: 'sm' as const,
      render: (product: any) => (
        <span className="text-gray-600">{formatDate(product.createdAt)}</span>
      ),
    },
  ];

  const handleEdit = (product: any) => {
    console.log('Edit product:', product);
  };

  const handleDelete = (product: any) => {
    console.log('Delete product:', product);
  };

  return (
    <DataTable
      title="Product List"
      columns={columns}
      data={allproduct}
      total={productTotal}
      onFetchData={GetProductListRequest}
      onEdit={handleEdit}
      onDelete={handleDelete}
      initialPerPage={20} // Custom initial per page
    />
  );
};

export default ProductList;
