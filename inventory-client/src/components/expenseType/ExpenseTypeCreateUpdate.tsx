import { useEffect, useState } from "react";
import { ErrorToast, IsEmpty } from "../../helper/formHelper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { store, type RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { OnChangeExpenseTypeInput } from "../../redux/state_slice/expenseTypeslice";
import { CreateUpdateExpenseTypeRequest, FillExpenseTypeFormRequest } from "../../APIRequest/ExpenseTypeAPIRequest";

const ExpenseTypeCreateUpdate = () => {
   const navigate = useNavigate();
   const [objectId, setObjectId] = useState<string | null>(null);
   const FormValue = useSelector((state: RootState) => state.expensetype.FormValue);
   

   useEffect(() => {
     let params = new URLSearchParams(window.location.search);
     let id = params.get('id');
     if (id !== null) {
       setObjectId(id);
       (async () => {
         await FillExpenseTypeFormRequest(id);
       })();
     }
   }, []);

   const saveChangeHandle = async (
     e: React.MouseEvent<HTMLButtonElement>,
   ): Promise<void> => {
     e.preventDefault();
     if (IsEmpty(FormValue.name as string)) {
       ErrorToast('Expense Name Required');
     } else {
       const result = await CreateUpdateExpenseTypeRequest(FormValue, objectId);
       if (result) {
         navigate('/expensetype-list');
       }
     }
   };
  return (
    <div className="flex items-center justify-center py-10 md:px-10">
      <div className="bg-white px-6 py-6 w-full lg:w-[70%] border rounded-xl shadow-xl">
        <h1 className="text-2xl font-semibold text-blue-500 py-5">
           {`${objectId ? 'Update' : 'Create'} Expense Type`}
        </h1>
        <form className="md:grid grid-cols-12 gap-4 w-full space-y-4 text-slate-700 items-center justify-end">
          <div className="flex  flex-col col-span-6">
            <label htmlFor="text" className=" font-semibold mb-2">
              Expense Name
            </label>
            <Input
              onChange={e => {
                store.dispatch(
                  OnChangeExpenseTypeInput({
                    name: 'name',
                    value: e.target.value,
                  }),
                );
              }}
              defaultValue={FormValue.name ?? ''}
              id="text"
              type="text"
              placeholder="Enter Note"
              className="focus-visible:ring-blue-500 "
            />
          </div>
          <div className="flex flex-col col-span-4 mt-4">
            <Button
              onClick={saveChangeHandle}
              variant={'skybtn'}
              className="py-5"
            >
              Save Change
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseTypeCreateUpdate