import { Edit, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import SelectInput from '../common/SelectInput';
import ReactPaginateImport from 'react-paginate';

const ReactPaginate =
  (ReactPaginateImport as any).default ?? ReactPaginateImport;

interface Column {
  key: string;
  label: string;
  render?: (item: any, index: number) => React.ReactNode;
  hidden?: 'sm' | 'md' | 'lg'; // Responsive hiding
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: any[] | null;
  total: number;
  onFetchData: (page: number, perPage: number, search: string) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  showActions?: boolean;
  initialPerPage?: number;
  pageOptions?: number[];
}

const defaultPageOptions = [
  { value: '5', item: '5/page' },
  { value: '10', item: '10/page' },
  { value: '20', item: '20/page' },
  { value: '50', item: '50/page' },
  { value: '100', item: '100/page' },
];

const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  data,
  total,
  onFetchData,
  onEdit,
  onDelete,
  showActions = true,
  initialPerPage = 10,
  pageOptions = defaultPageOptions,
}) => {
  const hasFetched = useRef(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('0');
  const [perPage, setPerPage] = useState(initialPerPage);
  const shouldShowScroll = total > 5;

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    onFetchData(1, perPage, searchKeyword);
  }, []);

  const handlePageClick = (event: any) => {
    const pageNo = event.selected;
    onFetchData(pageNo + 1, perPage, searchKeyword);
  };

  const perPageOnChange = (value: any) => {
    setPerPage(parseInt(value));
    onFetchData(1, parseInt(value), searchKeyword);
  };

  const searchKeywordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    if (e.target.value.length === 0) {
      setSearchKeyword('0');
      onFetchData(1, perPage, '0');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleSearch = () => {
    onFetchData(1, perPage, searchKeyword);
  };

  const getResponsiveClass = (hidden?: 'sm' | 'md' | 'lg') => {
    if (!hidden) return '';
    const classMap = {
      sm: 'hidden sm:table-cell',
      md: 'hidden md:table-cell',
      lg: 'hidden lg:table-cell',
    };
    return classMap[hidden];
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl flex flex-col">
          <div className="flex flex-col sm:flex-row gap-4 p-6 border-b border-gray-200">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-blue-600">{title}</h1>
            </div>

            <div className="w-full sm:w-auto">
              <SelectInput
                placeholder={`Per Page ${perPage}`}
                data={pageOptions}
                value={perPage}
                onValueChange={perPageOnChange}
              />
            </div>

            <form className="relative w-full sm:w-75">
              <Input
                onChange={searchKeywordOnChange}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Search..."
                className="w-full pr-20"
              />
              <Button
                type="button"
                onClick={handleSearch}
                variant="skybtn"
                className="absolute right-0 top-0 h-full px-3"
              >
                Search
              </Button>
            </form>
          </div>

          <div
            className={`flex-1 overflow-y-auto px-6  ${
              shouldShowScroll ? 'max-h-134' : ''
            }`}
          >
            <Table className="min-w-full mx-auto ">
              <TableHeader className="sticky top-0 ">
                <TableRow>
                  <TableHead>#NO</TableHead>
                  {columns.map((col, i) => (
                    <TableHead
                      key={i}
                      className={getResponsiveClass(col.hidden)}
                    >
                      {col.label}
                    </TableHead>
                  ))}
                  {showActions && <TableHead>ACTION</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    {columns.map((col, colIndex) => (
                      <TableCell
                        key={colIndex}
                        className={getResponsiveClass(col.hidden)}
                      >
                        {col.render ? col.render(item, index) : item[col.key]}
                      </TableCell>
                    ))}
                    {showActions && (
                      <TableCell className="text-left">
                        <div className="flex justify-start gap-2">
                          {onEdit && (
                            <button
                              onClick={() => onEdit(item)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                              aria-label="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(item)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                              aria-label="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="rounded-b-2xl px-6 py-4 border-t border-gray-200 bg-gray-50 mt-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <p className="text-sm text-blue-400">
                Total Items:{' '}
                <span className="font-semibold text-blue-700">{total}</span>
              </p>

              <div>
                <ReactPaginate
                  previousLabel="«"
                  nextLabel="»"
                  breakLabel="..."
                  pageCount={Math.ceil(total / perPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName="flex items-center justify-center gap-1"
                  pageClassName="inline-flex"
                  pageLinkClassName="px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-blue-50 hover:border-blue-400 transition-colors cursor-pointer"
                  previousClassName="inline-flex"
                  previousLinkClassName="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-pink-50 transition-colors cursor-pointer"
                  nextClassName="inline-flex"
                  nextLinkClassName="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                  breakClassName="inline-flex"
                  breakLinkClassName="px-3 py-2 text-sm text-gray-500"
                  activeClassName="bg-blue-500 text-white border-blue-500 hover:bg-pink-600 rounded-md"
                  activeLinkClassName="text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
