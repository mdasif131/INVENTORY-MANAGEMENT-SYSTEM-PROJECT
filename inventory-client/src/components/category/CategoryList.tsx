
// CategoryList Using the reusable component
import { useSelector } from 'react-redux';

import { formatDate } from '../../helper/dateFormat';
import type { RootState } from '../../redux/store/store';
import DataTable from '../common/DataTable';
import { GetCategoryListRequest } from '../../APIRequest/CategoryAPIRequest';

const CategoryList = () => {
  const allCategory = useSelector((state: RootState) => state.category.List);
  const categoryTotal = useSelector((state: RootState) => state.category.ListTotal);

  const columns = [
    {
      key: 'name',
      label: 'CATEGORY NAME',
      render: (category: any) => (
        <span className="font-semibold hover:text-blue-500 hoverTransition">
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

  const handleEdit = (category: any) => {
    console.log('Edit category:', category);
  };

  const handleDelete = (category: any) => {
    console.log('Delete category:', category);
  };

  return (
    <DataTable
      title="Category List"
      columns={columns}
      data={allCategory}
      total={categoryTotal}
      onFetchData={GetCategoryListRequest}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default CategoryList;