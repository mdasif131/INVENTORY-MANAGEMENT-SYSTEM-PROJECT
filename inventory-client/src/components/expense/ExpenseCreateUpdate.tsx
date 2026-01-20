
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CreateUpdateExpenseRequest, ExpenseTypeDropDownRequest, FillExpenseFormRequest } from '../../APIRequest/ExpenseAPIRequest';
import { ErrorToast, IsEmpty } from '../../helper/formHelper';
import { OnChangeExpenseInput } from '../../redux/state_slice/expenseSlice';
import { store, type RootState } from '../../redux/store/store';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router';

const ExpenseCreateUpdate = () => {
  const navigate = useNavigate();
  const [objectId, setObjectId]=useState<string | null>(null)
  const FormValue = useSelector((state: RootState) => state.expense.FormValue);
  const ExpenseTypeDropDown = useSelector(
    (state: RootState) => state.expense.ExpenseTypeDropDown,
  );

  useEffect(() => {
    (async () => {
    await ExpenseTypeDropDownRequest()
    })()
    
    let params = new URLSearchParams(window.location.search)
        let id = params.get('id');
        if (id !== null) {
          setObjectId(id);
          (async () => {
            await FillExpenseFormRequest(id)
          })()
        }
  }, []);
 
  const saveChangeHandle = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (IsEmpty(FormValue.typeID as string)) {
      ErrorToast('Expense Type Required');
    } else if (FormValue.amount === 0) {
      ErrorToast('Amount must be greater than 0');
    } else if (IsEmpty(FormValue.note)) {
      ErrorToast('Note Is Required');
    } else {
      const result = await CreateUpdateExpenseRequest(FormValue, objectId)
      if (result) {
       navigate('/expense-list')
     }
    }
  };
  return (
    <div className="flex items-center justify-center py-10 md:px-10">
      <div className="bg-white px-6 py-6 w-full lg:w-[70%] border rounded-xl shadow-xl">
        <h1 className="text-2xl font-semibold text-blue-500 py-5">
          {`${objectId ? 'Update' : 'Create'} Expense`}
        </h1>
        <form className="md:grid grid-cols-12 gap-4 w-full space-y-4 text-slate-700">
          <div className="flex flex-col col-span-4 ">
            <label htmlFor="as" className="font-semibold mb-2">
              Expense Type
            </label>
            <select
              value={FormValue.typeID}
              onChange={e => {
                store.dispatch(
                  OnChangeExpenseInput({
                    name: 'typeID',
                    value: e.target.value,
                  }),
                );
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700
             focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Type</option>

              {ExpenseTypeDropDown?.map((value, i) => (
                <option key={i} value={value._id}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col col-span-4">
            <label htmlFor="number" className=" font-semibold mb-2">
              Amount
            </label>
            <Input
              onChange={e => {
                store.dispatch(
                  OnChangeExpenseInput({
                    name: 'amount',
                    value: parseInt(e.target.value),
                  }),
                );
              }}
              value={FormValue.amount ?? ''}
              id="number"
              type="number"
              placeholder="Enter Amount"
              className="focus-visible:ring-blue-500 "
            />
          </div>
          <div className="flex flex-col col-span-4">
            <label htmlFor="text" className=" font-semibold mb-2">
              Expense Note
            </label>
            <Input
              onChange={e => {
                store.dispatch(
                  OnChangeExpenseInput({
                    name: 'note',
                    value: e.target.value,
                  }),
                );
              }}
              defaultValue={FormValue.note ?? ''}
              id="text"
              type="text"
              placeholder="Enter Note"
              className="focus-visible:ring-blue-500 "
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

export default ExpenseCreateUpdate;
