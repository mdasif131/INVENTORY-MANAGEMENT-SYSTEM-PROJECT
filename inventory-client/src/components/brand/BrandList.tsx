// ============================================
// 1. BrandList.tsx - Using the reusable component
// ============================================
import { useSelector } from 'react-redux';
import { DeleteBrandRequest, GetBrandListRequest } from '../../APIRequest/BrandAPIrequest';
import { formatDate } from '../../helper/dateFormat';
import type { RootState } from '../../redux/store/store';
import DataTable from '../common/DataTable';
import { DeleteAlert } from '../../helper/deleteAlert';

const BrandList = () => {
  const allBrand = useSelector((state: RootState) => state.brand.List);
  const brandTotal = useSelector((state: RootState) => state.brand.ListTotal);

  const columns = [
    {
      key: 'name',
      label: 'NAME',
      render: (brand: any) => (
        <span className="font-semibold cursor-pointer hover:text-lg hover:text-blue-500 hoverTransition">
          {brand.name}
        </span>
      ),
    },
    {
      key: 'userEmail',
      label: 'EMAIL',
      hidden: 'md' as const,
      render: (brand: any) => (
        <span className="text-gray-600">{brand.userEmail}</span>
      ),
    },
    {
      key: 'createdAt',
      label: 'CREATED',
      hidden: 'sm' as const,
      render: (brand: any) => (
        <span className="text-gray-600">{formatDate(brand.createdAt)}</span>
      ),
    },
  ];

  // const handleEdit = (brand: any) => {
  //   console.log('Edit brand:', brand);
  //   // Add your edit logic here
  // };

  const handleDelete =async (brand: any) => {
    const id = brand._id;
    const result = await DeleteAlert(id, DeleteBrandRequest, {
      entityName: 'Brand',
      title: 'Delete Brand?',
      confirmButtonText: 'Yes, delete Brand!',
    });

    if (result) {
      await GetBrandListRequest(1, 20, '0');
    }
  };

  return (
    <DataTable
      title="Brand List"
      columns={columns}
      data={allBrand}
      total={brandTotal}
      initialPerPage={10}
      onFetchData={GetBrandListRequest}
      updateURL="/brand-create-update"
      onDelete={handleDelete}
    />
  );
};

export default BrandList;
