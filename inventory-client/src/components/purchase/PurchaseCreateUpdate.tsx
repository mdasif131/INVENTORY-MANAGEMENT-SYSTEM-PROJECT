
import { Trash2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { CreatePurchaseRequest, SupplierDropDownRequest } from '../../APIRequest/PurchasesAPIRequest';
import {
  ProuductDropDownRequest
} from '../../APIRequest/SaleAPIRequest';
import { ErrorToast, IsEmpty } from '../../helper/formHelper';
import { OnChangePurchasesInput, RemovePurchaseItem, SetPurchaseItemList } from '../../redux/state_slice/purchaseSlice';
import {
  OnChangeReturnsInput
} from '../../redux/state_slice/returnslice';
import { store, type RootState } from '../../redux/store/store';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const PurchaseCreateUpdate = () => {
  const navigate = useNavigate();
  const hasLoadedDropdowns = useRef(false);
  //Form Value
  const productRef = useRef<HTMLSelectElement>(null);
  const qtyRef = useRef<HTMLInputElement>(null);
  const unitPriceRef = useRef<HTMLInputElement>(null);
  // state
  const SupplierDropdown = useSelector(
    (state: RootState) => state.purchase.SupplierDropDown,
  );
  const ProductDropDown = useSelector(
    (state: RootState) => state.sale.ProductDropDown,
  );
  const ParentData = useSelector(
    (state: RootState) => state.purchase.PurchaseFormValue,
  );
  const ChildData = useSelector(
    (state: RootState) => state.purchase.PurchaseItemList,
  );

  useEffect(() => {
    // Calculate subtotal from cart items
    const subtotal = ChildData?.reduce((sum: number, item: any) => {
      return sum + (item.total || 0);
    }, 0);

    // Get additional costs (default to 0 if not set)
    const vatTax = ParentData.vatTax || 0;
    const discount = ParentData.discount || 0;
    const otherCost = ParentData.otherCost || 0;
    const shippingCost = ParentData.shippingCost || 0;

    // Calculate grand total
    const calculatedGrandTotal =
      subtotal + vatTax + otherCost + shippingCost - discount;

    // Update grand total in Redux store
    store.dispatch(
      OnChangePurchasesInput({
        name: 'grandTotal',
        value: calculatedGrandTotal,
      }),
    );
  }, [
    ChildData,
    ParentData.vatTax,
    ParentData.discount,
    ParentData.otherCost,
    ParentData.shippingCost,
  ]);
  useEffect(() => {
    if (hasLoadedDropdowns.current) return;
    hasLoadedDropdowns.current = true;
    (async () => {
      await SupplierDropDownRequest();
      await ProuductDropDownRequest();
    })();
  }, []);
  const CreateNewSale = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (IsEmpty(ParentData.supplierID)) {
      ErrorToast('Please select a customer');
      return;
    }
    if (IsEmpty(ParentData.note)) {
      ErrorToast('Note is required');
      return;
    }

    // Validate Child Data (Cart Items)
    if (ChildData?.length === 0) {
      ErrorToast('Please add at least one product to cart');
      return;
    }

    // If all validations pass, create the sale
    let res = await CreatePurchaseRequest(ParentData, ChildData);
    if (res) {
      navigate('/purchase-list');
    }
  };
  const OnAddCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let ProductValue = productRef.current?.value || '';
    let ProductName = productRef.current?.selectedOptions[0]?.text || '';
    let qtyValue = qtyRef.current?.value || ' ';
    let unitPriceValue = unitPriceRef.current?.value || ' ';
    if (IsEmpty(ProductValue)) {
      ErrorToast('Seclect Product');
    } else if (IsEmpty(qtyValue)) {
      ErrorToast('Qty ');
    } else if (IsEmpty(unitPriceValue)) {
      ErrorToast('Unit Price ');
    } else {
      let item = {
        productID: ProductValue,
        productName: ProductName,
        qty: qtyValue,
        unitCost: unitPriceValue,
        total: parseInt(qtyValue) * parseInt(unitPriceValue),
      };
      store.dispatch(SetPurchaseItemList(item));
    }
  };
  const removeCart = (i: any) => {
    store.dispatch(RemovePurchaseItem(i));
  };
  return (
    <section>
      <div className="md:grid grid-cols-12 grid-rows-12 w-full gap-4 space-y-4">
        <div className="bg-white shadow-xl col-span-5 row-span-12 rounded-md px-4 space-y-4  py-8">
          <h1 className="font-bold text-2xl text-blue-400">Create Purchase</h1>
          {/* Parent Input  */}
          <div className="flex flex-col">
            <label htmlFor="as" className="font-semibold ">
              Supplier Name
            </label>
            <select
              value={ParentData.supplierID}
              onChange={e => {
                store.dispatch(
                  OnChangePurchasesInput({
                    name: 'supplierID',
                    value: e.target.value,
                  }),
                );
              }}
              className="w-full  px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700
                       focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 cursor-pointer"
            >
              <option value="">Select Type</option>

              {SupplierDropdown?.map((value, i) => (
                <option key={i} value={value._id}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="number" className="font-semibold ">
              {' '}
              Vat Tax
            </label>
            <Input
              onChange={e => {
                store.dispatch(
                  OnChangePurchasesInput({
                    name: 'vatTax',
                    value: parseInt(e.target.value),
                  }),
                );
              }}
              value={ParentData.vatTax ?? ''}
              id="number"
              type="number"
              placeholder="Enter Vat Tax"
              className="focus-visible:ring-blue-500 hover:border-blue-500 cursor-pointer"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="discount" className="font-semibold ">
              Discount
            </label>
            <Input
              onChange={e => {
                store.dispatch(
                  OnChangePurchasesInput({
                    name: 'discount',
                    value: parseInt(e.target.value),
                  }),
                );
              }}
              value={ParentData.discount ?? ''}
              id="discount"
              type="number"
              placeholder="Enter discount"
              className="focus-visible:ring-blue-500 hover:border-blue-500 cursor-pointer"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="otherCost" className="font-semibold ">
              Other Cost
            </label>
            <Input
              onChange={e => {
                store.dispatch(
                  OnChangePurchasesInput({
                    name: 'otherCost',
                    value: parseInt(e.target.value),
                  }),
                );
              }}
              value={ParentData.otherCost ?? ''}
              id="otherCost"
              type="number"
              placeholder="Enter Discount"
              className="focus-visible:ring-blue-500 hover:border-blue-500 cursor-pointer"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="shippingCost" className="font-semibold ">
              Shipping Cost
            </label>
            <Input
              onChange={e => {
                store.dispatch(
                  OnChangePurchasesInput({
                    name: 'shippingCost',
                    value: parseInt(e.target.value),
                  }),
                );
              }}
              value={ParentData.shippingCost ?? ''}
              id="shippingCost"
              type="number"
              placeholder="Enter shippingCost"
              className="focus-visible:ring-blue-500 hover:border-blue-500 cursor-pointer"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="grandTotal" className="font-semibold ">
              Grand Total
            </label>
            <Input
              readOnly
              value={ParentData.grandTotal ?? 0}
              id="grandTotal"
              type="number"
              placeholder="Enter grandTotal"
              className="focus-visible:ring-blue-500 hover:border-blue-500 cursor-pointer"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="note" className="font-semibold ">
              Note
            </label>
            <Input
              onChange={e => {
                store.dispatch(
                  OnChangePurchasesInput({
                    name: 'note',
                    value: e.target.value,
                  }),
                );
              }}
              value={ParentData.note ?? ''}
              id="note"
              type="text"
              placeholder="Enter note"
              className="focus-visible:ring-blue-500 hover:border-blue-500 cursor-pointer"
            />
          </div>
          <Button
            onClick={CreateNewSale}
            variant={'skybtn'}
            size={'lg'}
            className="px-18"
          >
            Create
          </Button>
        </div>
        <div className="flex flex-col  gap-4 col-span-7 row-span-12">
          {/* Child Inupt  */}
          <div className="bg-white shadow-xl rounded-md p-4 md:grid grid-cols-12 gap-x-2 items-end space-y-3">
            <div className="flex flex-col col-span-4">
              <label htmlFor="products" className="font-semibold ">
                Prouducts
              </label>
              <select
                ref={productRef}
                id="products"
                className="w-full  px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700
                       focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 cursor-pointer"
              >
                <option value="">Select Type</option>

                {ProductDropDown?.map((value, i) => (
                  <option key={i} value={value._id}>
                    {value.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="grandTotal" className="font-semibold ">
                Qty
              </label>
              <Input
                ref={qtyRef}
                id="grandTotal"
                type="number"
                placeholder="Enter Qty"
                className="focus-visible:ring-blue-500 hover:border-blue-500 cursor-pointer"
              />
            </div>
            <div className="flex flex-col col-span-3">
              <label htmlFor="grandTotal" className="font-semibold ">
                Unit Price
              </label>
              <Input
                ref={unitPriceRef}
                id="grandTotal"
                type="number"
                placeholder="Enter Qty"
                className="focus-visible:ring-blue-500 hover:border-blue-500 cursor-pointer"
              />
            </div>
            <div className="flex flex-col col-span-3">
              <Button
                onClick={OnAddCart}
                variant={'skybtn'}
                className="py-5 mb-3"
              >
                Add to Cart
              </Button>
            </div>
          </div>
          <div className="bg-white shadow-xl rounded-md p-4">
            <table className="min-w-full">
              <thead className="border-b-2 border-gray-300">
                <tr>
                  <th className="text-gray-500 pb-3 ">Name</th>
                  <th className="text-gray-500 pb-3">Qty</th>
                  <th className="text-gray-500 pb-3">Unit Price</th>
                  <th className="text-gray-500 pb-3">Total</th>
                  <th className="text-gray-500 pb-3">Remove</th>
                </tr>
              </thead>
              <tbody>
                {ChildData?.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 text-center border-b"
                  >
                    <td className="">{item.productName}</td>
                    <td className="">{item.qty}</td>
                    <td className="">{item.unitCost}</td>
                    <td className="">{item.total}</td>
                    <td className="">
                      <button
                        onClick={() => removeCart(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-12 inline-flex items-center justify-end"></div>
      </div>
    </section>
  );
};

export default PurchaseCreateUpdate;
