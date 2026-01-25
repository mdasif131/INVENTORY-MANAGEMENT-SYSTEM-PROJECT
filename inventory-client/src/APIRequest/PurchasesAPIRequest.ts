import axios from 'axios';
import { AxiosHeader, BaseURL } from '../helper/config';
import { ErrorToast, SuccessToast } from '../helper/formHelper';
import {
  SetPurchaseList,
  SetPurchaseListTotal,
  SetSupplierDropDown,
  type IPurchaseFormValue,
} from '../redux/state_slice/purchaseSlice';
import { HideLoader, ShowLoader } from '../redux/state_slice/settingsSlice';
import { store } from '../redux/store/store';

export async function GetPurchaseListRequest(
  pageNo: string | number,
  perPage: string | number,
  SearchKeyword: string,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/purchases-list/${pageNo}/${perPage}/${SearchKeyword}`;

  try {
    const res = await axios.get(URL, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      const responseData = res.data?.data[0];

      if (responseData?.Rows && responseData.Rows.length > 0) {
        store.dispatch(SetPurchaseList(responseData.Rows));
        store.dispatch(SetPurchaseListTotal(responseData.Total[0].count));
        return true;
      } else {
        store.dispatch(SetPurchaseList([]));
        store.dispatch(SetPurchaseListTotal(0));
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

export async function CreatePurchaseRequest(
  ParentBody: IPurchaseFormValue,
  ChildBody: any[] | null,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/create-purchases`;
  let PostBody = { parent: ParentBody, childs: ChildBody };
  try {
    const res = await axios.post(URL, PostBody, AxiosHeader);

    if (res.status === 201 && res.data?.status === 'success') {
      SuccessToast('Request successful');
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
export async function SupplierDropDownRequest(): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/supplierDropDown`;
  try {
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(SetSupplierDropDown(res.data?.data));
    return true;
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}