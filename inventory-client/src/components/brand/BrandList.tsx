import { Edit, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { GetBrandListRequest } from '../../APIRequest/BrandAPIrequest';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { formatDate } from '../../helper/dateFormat';
import type { RootState } from '../../redux/store/store';
import SelectInput from '../common/SelectInput';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import ReactPaginateImport from 'react-paginate';

const ReactPaginate =
  (ReactPaginateImport as any).default ?? ReactPaginateImport;
interface IValu {
  value: string | number;
  item: string;
}

const data: IValu[] = [
  { value: '5', item: '5/page' },
  { value: '10', item: '10/page' },
  { value: '20', item: '20/page' },
  { value: '50', item: '50/page' },
  { value: '100', item: '100/page' },
];

const headData: string[] = ['#NO', 'NAME', 'EMAIL', 'CREATED', 'ACTION'];
const BrandList = () => {
  const hasFetched = useRef(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('0');
  const [PerPage, setPerPage] = useState(10);
  const AllBrand = useSelector((state: RootState) => state.brand.List);
  const BrandTotal = useSelector((state: RootState) => state.brand.ListTotal);
  const shouldShowScroll = BrandTotal > 5;

  // Initial load
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    GetBrandListRequest(1, PerPage, searchKeyword);
  }, []);

  const handlePageClick = (event: any) => {
    let pageNo = event.selected;
    GetBrandListRequest(pageNo + 1, PerPage, searchKeyword);
  };
  // const perPageOnChange = (e: any) => {
  //   setPerPage(parseInt(e.target.value));
  //   GetBrandListRequest(1, e.target.value, searchKeyword);
  // };

  const perPageOnChange = (value: any) => {
    setPerPage(value);
    GetBrandListRequest(1, parseInt(value), searchKeyword);
  };
  const searchKewordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    if (e.target.value.length === 0) {
      setSearchKeyword('0');
      GetBrandListRequest(1, PerPage, '0');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // stops form submit
      return; // stops all logic
    }
  };

  const handleSearch = () => {
    GetBrandListRequest(1, PerPage, searchKeyword);
  };
  return (
    <div className=" px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto ">
        <div className="bg-white rounded-lg shadow-sm flex flex-col ">
          <div className="flex flex-col sm:flex-row gap-4 p-6 border-b border-gray-200">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-blue-600">Brand List</h1>
            </div>

            <div className="w-full sm:w-auto">
              <SelectInput
                data={data}
                value={PerPage}
                onValueChange={perPageOnChange}
              />
            </div>

            {/* Search input with search button - responsive */}
            <form className="relative w-full sm:w-75">
              <Input
                onChange={searchKewordOnChange}
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

          {/* Scrollable table container */}
          <div
            className={`flex-1 overflow-y-auto px-6 ${
              shouldShowScroll ? 'max-h-134' : ''
            }`}
          >
            <Table className="min-w-full">
              <TableHeader className="sticky top-0 bg-blue-100 ">
                <TableRow>
                  {headData.map((item, i) => (
                    <TableHead key={i}>{item}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {AllBrand?.map((brand, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-semibold hover:text-blue-500 hoverTransition">
                      {brand.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-gray-600">
                      {brand.userEmail}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-gray-600">
                      {formatDate(brand?.createdAt as string)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          aria-label="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="rounded-b-2xl px-6 py-4 border-t border-gray-200 bg-gray-50 mt-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <p className="text-sm text-gray-600">
                Total Brands:{' '}
                <span className="font-semibold">{BrandTotal}</span>
              </p>

              <div>
                <ReactPaginate
                  previousLabel="«"
                  nextLabel="»"
                  breakLabel="..."
                  pageCount={Math.ceil(BrandTotal / PerPage)}
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

export default BrandList;
