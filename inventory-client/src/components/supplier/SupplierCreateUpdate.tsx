import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ErrorToast, IsEmail, IsEmpty } from '../../helper/formHelper';
import { store, type RootState } from '../../redux/store/store';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { OnChangeSupplerInput } from '../../redux/state_slice/supplierSlice';
import { CreateUpdateSupplierRequest, FillSupplierFormRequest } from '../../APIRequest/SupplierAPIRequest';

const SupplierCreateUpdate = () => {
  const navigate = useNavigate();
  const [objectId, setObjectId] = useState<string | null>(null);
  const FormValue = useSelector((state: RootState) => state.supplier.FormValue);

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    if (id !== null) {
      setObjectId(id);
      (async () => {
        await FillSupplierFormRequest(id)
      })();
    }
  }, []);
  const saveChangeHandle = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (IsEmpty(FormValue.name as string)) {
      ErrorToast('Supplier Name Required');
    } else if (IsEmpty(FormValue.phone as string)) {
      ErrorToast('Supplier Phone Number Required');
    } else if (IsEmail(FormValue.email as string)) {
      ErrorToast('Valid Email Required');
    } else if (IsEmpty(FormValue.address)) {
      ErrorToast('Address Is Required');
    } else {
      console.log(FormValue)
      const result = await CreateUpdateSupplierRequest(
        FormValue,
        objectId as string,
      );
      if (result) {
        navigate('/supplier-list');
      }
    }
  };
  return (
    <div className="flex items-center justify-center py-10 md:px-10">
      <div className="bg-white px-6 py-6 w-full lg:w-[70%] border rounded-xl shadow-xl">
        <h1 className="text-2xl font-semibold text-blue-500 py-5">
          {`${objectId ? 'Update' : 'Create'} Supplier`}
        </h1>
        <form className="md:grid grid-cols-12 gap-4 w-full space-y-4 text-slate-700">
          <div className="flex flex-col col-span-4 ">
            <label htmlFor="name" className="font-semibold mb-2">
              Supplier Name
            </label>
            <Input
              onChange={e => {
                store.dispatch(
                  OnChangeSupplerInput({
                    Name: 'name',
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
          <div className="flex flex-col col-span-4">
            <label className=" font-semibold mb-2">Mobile No</label>
            <Input
              onChange={e => {
                store.dispatch(
                  OnChangeSupplerInput({
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
                  OnChangeSupplerInput({
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
                  OnChangeSupplerInput({
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

export default SupplierCreateUpdate;
