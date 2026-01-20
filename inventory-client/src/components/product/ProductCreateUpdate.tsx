import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  BrandDropDownRequest,
  CategoryDropDownRequest,
  CreateUpdateProductRequest,
  FillProuctFormRequest,
} from '../../APIRequest/ProductAPIRequest';
import { ErrorToast, IsEmpty } from '../../helper/formHelper';
import { OnChangeProductInput } from '../../redux/state_slice/productSlice';
import { store, type RootState } from '../../redux/store/store';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const ProductCreateUpdate = () => {
  const hasLoadedDropdowns = useRef(false);
  const hasLoadedProduct = useRef(false);
  const navigate = useNavigate();
  const [objectId, setObjectId] = useState<string | null>(null);
  const FormValue = useSelector((state: RootState) => state.product.FormValue);
  const BrandDropDown = useSelector(
    (state: RootState) => state.product.BrandDropDown,
  );
  const CategoryDropDown = useSelector(
    (state: RootState) => state.product.CategoryDropDown,
  );
  useEffect(() => {
    if (hasLoadedDropdowns.current) return;
    hasLoadedDropdowns.current = true;
    (async () => {
      await BrandDropDownRequest();
      await CategoryDropDownRequest();
    })();

    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');

    if (id !== null) {
      setObjectId(id);
      (async () => {
        if (hasLoadedProduct.current) return;

        hasLoadedProduct.current = true;
        await FillProuctFormRequest(id);
      })();
    }
  }, []);

  const saveChangeHandle = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (IsEmpty(FormValue.brandID as string)) {
      ErrorToast('Brand Type Required');
    } else if (IsEmpty(FormValue.categoryID)) {
      ErrorToast('Category Is Required');
    } else if (IsEmpty(FormValue.name)) {
      ErrorToast('Name Is Required');
    } else if (IsEmpty(FormValue.unit)) {
      ErrorToast('unit Is Required');
    } else if (IsEmpty(FormValue.details as string)) {
      ErrorToast('Details Is Required');
    } else {
      const result = await CreateUpdateProductRequest(FormValue, objectId);
      if (result) {
        navigate('/product-list');
      }
    }
  };
  return (
    <div className="flex items-center justify-center py-10 md:px-10">
      <div className="bg-white px-6 py-6 w-full lg:w-[70%] border rounded-xl shadow-xl">
        <h1 className="text-2xl font-semibold text-blue-500 py-5">
          {`${objectId ? 'Update' : 'Create'} Product`}
        </h1>
        <form className="md:grid grid-cols-12 gap-4 w-full space-y-4 text-slate-700">
          <div className="flex flex-col col-span-6">
            <label htmlFor="name" className=" font-semibold mb-2">
              Product Name
            </label>
            <Input
              onChange={e => {
                store.dispatch(
                  OnChangeProductInput({
                    name: 'name',
                    value: e.target.value,
                  }),
                );
              }}
              value={FormValue.name ?? ''}
              id="name"
              type="text"
              placeholder="Enter Name"
              className="focus-visible:ring-blue-500 "
            />
          </div>
          <div className="flex flex-col col-span-6 ">
            <label htmlFor="as" className="font-semibold mb-2">
              Brand Type
            </label>
            <select
              value={FormValue.brandID}
              onChange={e => {
                store.dispatch(
                  OnChangeProductInput({
                    name: 'brandID',
                    value: e.target.value,
                  }),
                );
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700
             focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Type</option>

              {BrandDropDown?.map((value, i) => (
                <option key={i} value={value._id}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col col-span-6 ">
            <label htmlFor="categoryID" className="font-semibold mb-2">
              Product Category
            </label>
            <select
              value={FormValue.categoryID}
              onChange={e => {
                store.dispatch(
                  OnChangeProductInput({
                    name: 'categoryID',
                    value: e.target.value,
                  }),
                );
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700
             focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Type</option>

              {CategoryDropDown?.map((value, i) => (
                <option key={i} value={value._id}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col col-span-6">
            <label htmlFor="unit" className=" font-semibold mb-2">
              Unit
            </label>
            <Input
              onChange={e => {
                store.dispatch(
                  OnChangeProductInput({
                    name: 'unit',
                    value: e.target.value,
                  }),
                );
              }}
              defaultValue={FormValue.unit ?? ''}
              id="unit"
              type="text"
              placeholder="Enter Note"
              className="focus-visible:ring-blue-500 "
            />
          </div>
          <div className="flex flex-col col-span-12">
            <label className=" font-semibold mb-2">Details</label>
            <Textarea
              onChange={e => {
                store.dispatch(
                  OnChangeProductInput({
                    name: 'details',
                    value: e.target.value,
                  }),
                );
              }}
              defaultValue={FormValue.details ?? ''}
              className="focus-visible:ring-blue-500 transition-all duration-300 hover:ring-2 hover:ring-blue-200 min-h-30"
              placeholder="Type product details here..."
            />
          </div>
          <div>
            <Button onClick={saveChangeHandle} size={'lg'} variant={'skybtn'}>
              Save Change
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCreateUpdate;
