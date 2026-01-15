import axios from 'axios';
import { AxiosHeader, BaseURL } from '../helper/config';
import { ErrorToast, SuccessToast } from '../helper/formHelper';
import { SetExpenseList, SetExpenseListTotal } from '../redux/state_slice/expenseSlice';
import { HideLoader, ShowLoader } from '../redux/state_slice/settingsSlice';
import { store } from '../redux/store/store';

export async function GetExpensesListRequest(
  pageNo: string | number,
  perPage: string | number,
  SearchKeyword: string
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
