
// CategoryList Using the reusable component
import { useSelector } from 'react-redux';

import { formatDate } from '../../helper/dateFormat';
import type { RootState } from '../../redux/store/store';
import DataTable from '../common/DataTable';
import { DeleteCategoryRequest, GetCategoryListRequest } from '../../APIRequest/CategoryAPIRequest';
import { DeleteAlert } from '../../helper/deleteAlert';

const CategoryList = () => {
  const allCategory = useSelector((state: RootState) => state.category.List);
  const categoryTotal = useSelector((state: RootState) => state.category.ListTotal);

  const columns = [
    {
      key: 'name',
      label: 'CATEGORY NAME',
      render: (category: any) => (
        <span className="font-semibold cursor-pointer hover:text-lg hover:text-blue-500 hoverTransition">
          {category.name}
        </span>
      ),
    },
    {
      key: 'description',
      label: 'EMAIL',
      hidden: 'lg' as const,
      render: (category: any) => (
        <span className="text-gray-600">{category.userEmail || 'N/A'}</span>
      ),
    },
    {
      key: 'createdAt',
      label: 'CREATED',
      hidden: 'sm' as const,
      render: (category: any) => (
        <span className="text-gray-600">{formatDate(category.createdAt)}</span>
      ),
    },
  ];

  // const handleEdit = (category: any) => {
  //   console.log('Edit category:', category);
  // };

  const handleDelete =async (category: any) => {
     const id = category._id;
        const result = await DeleteAlert(id, DeleteCategoryRequest, {
          entityName: 'Category',
          title: 'Delete Category?',
          confirmButtonText: 'Yes, delete Category!',
        });
    
        if (result) {
          await GetCategoryListRequest(1, 20, '0');
        }
  };

  return (
    <DataTable
      title="Category List"
      columns={columns}
      data={allCategory}
      total={categoryTotal}
      onFetchData={GetCategoryListRequest}
      updateURL="/category-create-update"
      onDelete={handleDelete}
    />
  );
};

export default CategoryList;