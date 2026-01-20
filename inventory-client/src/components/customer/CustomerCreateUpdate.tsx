import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreateUpdateCustomerRequest, FillCustomerFormRequest } from '../../APIRequest/CustomerAPIRequest';
import { ErrorToast, IsEmail, IsEmpty } from '../../helper/formHelper';
import {
  OnChangeCustomerInput
} from '../../redux/state_slice/customerSlice';
import { store, type RootState } from '../../redux/store/store';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useEffect, useState } from 'react';

const CustomerCreateUpdate = () => {
  const navigate = useNavigate()
  const [objectId, setObjectId]=useState<string | null>(null)
  const FormValue = useSelector((state: RootState) => state.customer.FormValue);

  useEffect(() => {
    let params = new URLSearchParams(window.location.search)
    let id = params.get('id');
    if (id !== null) {
      setObjectId(id);
      (async () => {
        await FillCustomerFormRequest(id)
      })()
    }
  },[])
  const saveChangeHandle = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (IsEmpty(FormValue.customerName as string)) {
      ErrorToast('Customer Name Required');
    } else if (IsEmpty(FormValue.phone as string)) {
      ErrorToast('Customer Phone Number Required');
    } else if (IsEmail(FormValue.email as string)) {
      ErrorToast('Valid Email Required');
    } else if (IsEmpty(FormValue.address)) {
      ErrorToast("Address Is Required")
    } else {
      const result = await CreateUpdateCustomerRequest(FormValue, objectId as string);
      if (result) {
        navigate('/customer-list');
      }
    }
  };
  return (
    <div className="flex items-center justify-center py-10 md:px-10">
      <div className="bg-white px-6 py-6 w-full lg:w-[70%] border rounded-xl shadow-xl">
        <h1 className="text-2xl font-semibold text-blue-500 py-5">
          {`${objectId ? 'Update' : 'Create'} Customer`}
        </h1>
        <form className="md:grid grid-cols-12 gap-4 w-full space-y-4 text-slate-700">
          <div className="flex flex-col col-span-4 ">
            <label className="font-semibold mb-2">Customer Name</label>
            <Input
              onChange={e => {
                store.dispatch(
                  OnChangeCustomerInput({
                    Name: 'customerName',
                    value: e.target.value,
                  }),
                );
              }}
              defaultValue={FormValue.customerName ?? ''}
              id="name"
              type="text"
              placeholder="Enter Name"
              className="focus-visible:ring-blue-500 "
            />
          </div>
          <div className="flex flex-col col-span-4">
            <label className=" font-semibold mb-2">Mobile No</label>
            <Input
              onChange={e => {
                store.dispatch(
                  OnChangeCustomerInput({
                    Name: 'phone',
                    value: e.target.value,
                  }),
                );
              }}
              defaultValue={FormValue.phone ?? ''}
              id="text"
              type="text"
              placeholder="Mobile Number"
              className="focus-visible:ring-blue-500 "
            />
          </div>
          <div className="flex flex-col col-span-4">
            <label className=" font-semibold mb-2">Email</label>
            <Input
              onChange={e => {
                store.dispatch(
                  OnChangeCustomerInput({
                    Name: 'email',
                    value: e.target.value,
                  }),
                );
              }}
              defaultValue={FormValue.email ?? ''}
              id="email"
              type="email"
              placeholder="Enter eamil"
              className="focus-visible:ring-blue-500 "
            />
          </div>
          <div className="flex flex-col col-span-12">
            <label className=" font-semibold mb-2">Address</label>
            <Textarea
              onChange={e => {
                store.dispatch(
                  OnChangeCustomerInput({
                    Name: 'address',
                    value: e.target.value,
                  }),
                );
              }}
              defaultValue={FormValue.address ?? ''}
              className="focus-visible:ring-blue-500 transition-all duration-300 hover:ring-2 hover:ring-blue-200 min-h-30"
              placeholder="Type your address here..."
            />
          </div>
          <div>
            <Button onClick={saveChangeHandle} variant={'skybtn'}>
              Save Change
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerCreateUpdate;
