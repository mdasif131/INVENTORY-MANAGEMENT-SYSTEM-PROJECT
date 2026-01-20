import axios from 'axios';
import { AxiosHeader, BaseURL } from '../helper/config';
import { ErrorToast, SuccessToast } from '../helper/formHelper';
import {
  OnChangeExpenseInput,
  SetExpenseList,
  SetExpenseListTotal,
  SetExpenseTypeDropDown,
  type IExpense,
} from '../redux/state_slice/expenseSlice';
import { HideLoader, ShowLoader } from '../redux/state_slice/settingsSlice';
import { store } from '../redux/store/store';
import { ResetFormValue } from '../redux/state_slice/customerSlice';

export async function GetExpensesListRequest(
  pageNo: string | number,
  perPage: string | number,
  SearchKeyword: string,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/expenses-list/${pageNo}/${perPage}/${SearchKeyword}`;

  try {
    const res = await axios.get(URL, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      const responseData = res.data?.data[0];

      if (responseData?.Rows && responseData.Rows.length > 0) {
        store.dispatch(SetExpenseList(responseData.Rows));
        store.dispatch(SetExpenseListTotal(responseData.Total[0].count));
        SuccessToast('Expense list loaded successfully');
        return true;
      } else {
        store.dispatch(SetExpenseList([]));
        store.dispatch(SetExpenseListTotal(0));
        ErrorToast('No Data Found');
        return false;
      }
    } else {
      ErrorToast('Failed to fetch brand list');
      return false;
    }
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}

export async function ExpenseTypeDropDownRequest(): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/expensetypesDropDown`;
  try {
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(SetExpenseTypeDropDown(res.data?.data));
    return true;
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}

export async function CreateUpdateExpenseRequest(
  PostBody: IExpense,
  ObjectId: string | null,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string;
  let res;
  try {
    if (ObjectId === null) {
      // Create new expense
      URL = `${BaseURL}/create-expenses`;
      res = await axios.post(URL, PostBody, AxiosHeader);
    } else {
      // Update existing expense
      URL = `${BaseURL}/update-expenses/${ObjectId}`;
      res = await axios.put(URL, PostBody, AxiosHeader);
    }

    if (
      (res.status === 200 || res.status === 201) &&
      res.data?.status === 'success'
    ) {
      SuccessToast('Request Success');
      store.dispatch(ResetFormValue());
      return true;
    } else {
      ErrorToast('Something went wrong');
      return false;
    }
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}

export async function FillExpenseFormRequest(
  ObjectId: string,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/expenses-details-by-id/${ObjectId}`;

  try {
    const res = await axios.get(URL, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      const responseData = res.data?.data[0];
      store.dispatch(
        OnChangeExpenseInput({ name: 'typeID', value: responseData?.typeID }),
      );
      store.dispatch(
        OnChangeExpenseInput({ name: 'amount', value: responseData.amount }),
      );
      store.dispatch(
        OnChangeExpenseInput({ name: 'note', value: responseData?.note }),
      );
      return true;
    } else {
      ErrorToast('Something went wrong');
      return false;
    }
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}
export async function DeleteExpenseRequest(
  ObjectId: string,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/delete-expense/${ObjectId}`;

  try {
    const res = await axios.delete(URL, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      // SuccessToast('Request Success');
      return true;
    } else {
      ErrorToast('Something went wrong');
      return false;
    }
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}