import axios from 'axios';
import { store } from '../redux/store/store';
import { HideLoader, ShowLoader } from '../redux/state_slice/settingsSlice';
import { ErrorToast, SuccessToast } from '../helper/formHelper';
import { AxiosHeader, BaseURL } from '../helper/config';
import {
  OnChangeBrandInput,
  ResetBrandFormValue,
  SetBrandList,
  SetBrandListTotal,
  type Ibrand,
} from '../redux/state_slice/brandSlice';

export async function GetBrandListRequest(
  pageNo: number,
  perPage: string | number,
  SearchKeyword: string,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/brand-list/${pageNo}/${perPage}/${SearchKeyword}`;

  try {
    const res = await axios.get(URL, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      const responseData = res.data?.data[0];

      if (responseData?.Rows && responseData.Rows.length > 0) {
        store.dispatch(SetBrandList(responseData.Rows));
        store.dispatch(SetBrandListTotal(responseData.Total[0].count));
        return true;
      } else {
        store.dispatch(SetBrandList([]));
        store.dispatch(SetBrandListTotal(0));
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

export async function CreateUpdateBrandRequest(
  PostBody: Ibrand,
  ObjectId: string | null,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string;
  let res;
  try {
    if (ObjectId === null) {
      // Create new expense
      URL = `${BaseURL}/create-brand`;
      res = await axios.post(URL, PostBody, AxiosHeader);
    } else {
      // Update existing expense
      URL = `${BaseURL}/update-brand/${ObjectId}`;
      res = await axios.put(URL, PostBody, AxiosHeader);
    }

    if (
      (res.status === 200 || res.status === 201) &&
      res.data?.status === 'success'
    ) {
      SuccessToast('Request Success');
      store.dispatch(ResetBrandFormValue());
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
export async function FillBrandFormRequest(
  ObjectId: string,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/brand-details-by-id/${ObjectId}`;

  try {
    const res = await axios.get(URL, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      const responseData = res.data?.data[0];
      store.dispatch(
        OnChangeBrandInput({ name: 'name', value: responseData?.name }),
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
export async function DeleteBrandRequest(
  ObjectId: string,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/delete-brand/${ObjectId}`;

  try {
    const res = await axios.delete(URL, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      return true;
    } else if (res.status === 409 && res.data?.status === 'Associate') {
      ErrorToast((res.data?.message as string) || 'Can not delete');
      return false;
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