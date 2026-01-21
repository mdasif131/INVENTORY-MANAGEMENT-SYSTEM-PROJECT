import axios from "axios";
import { AxiosHeader, BaseURL } from "../helper/config";
import { ErrorToast, SuccessToast } from "../helper/formHelper";
import { HideLoader, ShowLoader } from "../redux/state_slice/settingsSlice";
import { store } from "../redux/store/store";
import { SetExpenseByDateList, SetPurchaseByDateListTotal, SetReturnByDateListTotal, SetSalesByDateListTotal } from "../redux/state_slice/reportslice";

export async function ExpenseByDateRequest(FormDate: string, ToDate: string) {
  store.dispatch(ShowLoader());
  let PostBody = {
    formDate: FormDate,
    toDate: ToDate,
  };

  // +'T00:00:00:000+00:00';
  let URL: string = `${BaseURL}/expenses-by-date`;

  try {
    const res = await axios.post(URL, PostBody, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      store.dispatch(SetExpenseByDateList(res.data?.data));
      SuccessToast('Report generated successfully');
      return true;
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
export async function PurchaseByDateRequest(FormDate: string, ToDate: string){
  store.dispatch(ShowLoader());
  let PostBody = {
    formDate: FormDate ,
    toDate: ToDate ,
  };

  // +'T00:00:00:000+00:00';
  let URL: string = `${BaseURL}/purchases-by-date`;

  try {
    const res = await axios.post(URL,PostBody, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      store.dispatch(SetPurchaseByDateListTotal(res.data?.data))
       SuccessToast('Purchases generated successfully');
      return true;
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
export async function ReturnByDateRequest(FormDate: string, ToDate: string){
  store.dispatch(ShowLoader());
  let PostBody = {
    formDate: FormDate ,
    toDate: ToDate ,
  };
  let URL: string = `${BaseURL}/return-by-date`;

  try {
    const res = await axios.post(URL,PostBody, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      store.dispatch(SetReturnByDateListTotal(res.data?.data))
       SuccessToast('Return generated successfully');
      return true;
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
export async function SalesByDateRequest(FormDate: string, ToDate: string){
  store.dispatch(ShowLoader());
  let PostBody = {
    formDate: FormDate ,
    toDate: ToDate ,
  };
  let URL: string = `${BaseURL}/sales-by-date`;

  try {
    const res = await axios.post(URL,PostBody, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      store.dispatch(SetSalesByDateListTotal(res.data?.data))
       SuccessToast('Sales generated successfully');
      return true;
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
