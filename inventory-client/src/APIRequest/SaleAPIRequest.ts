import axios from 'axios';
import { AxiosHeader, BaseURL } from '../helper/config';
import { ErrorToast, SuccessToast } from '../helper/formHelper';
import {
  SetCustomerDropDown,
  SetProductDropDown,
  SetSaleList,
  SetSaleListTotal,
  type ISaleFormValue,
} from '../redux/state_slice/saleSlice';
import { HideLoader, ShowLoader } from '../redux/state_slice/settingsSlice';
import { store } from '../redux/store/store';

export async function GetSaleListRequest(
  pageNo: string | number,
  perPage: string | number,
  SearchKeyword: string,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/sales-list/${pageNo}/${perPage}/${SearchKeyword}`;

  try {
    const res = await axios.get(URL, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      const responseData = res.data?.data[0];

      if (responseData?.Rows && responseData.Rows.length > 0) {
        store.dispatch(SetSaleList(responseData.Rows));
        store.dispatch(SetSaleListTotal(responseData.Total[0].count));
        SuccessToast('Sales list loaded successfully');
        return true;
      } else {
        store.dispatch(SetSaleList([]));
        store.dispatch(SetSaleListTotal(0));
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

export async function CreateSaleRequest(
  ParentBody: ISaleFormValue,
  ChildBody: any[] | null,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/create-sales`;
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

export async function CustomerDropDownRequest(): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/customerDropDown`;
  try {
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(SetCustomerDropDown(res.data?.data));
    return true;
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}
export async function ProuductDropDownRequest(): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/productDropDown`;
  try {
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(SetProductDropDown(res.data?.data));
    return true;
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}
