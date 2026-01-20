import axios from 'axios';
import { AxiosHeader, BaseURL } from '../helper/config';
import { ErrorToast, SuccessToast } from '../helper/formHelper';
import {
  OnChangeCategoryInput,
  ResetCategoryFormValue,
  SetCategoryList,
  SetCategoryListTotal,
  type ICategory,
} from '../redux/state_slice/categorySlice';
import { HideLoader, ShowLoader } from '../redux/state_slice/settingsSlice';
import { store } from '../redux/store/store';

export async function GetCategoryListRequest(
  pageNo: string | number,
  perPage: string | number,
  SearchKeyword: string,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/category-list/${pageNo}/${perPage}/${SearchKeyword}`;

  try {
    const res = await axios.get(URL, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      const responseData = res.data?.data[0];

      if (responseData?.Rows && responseData.Rows.length > 0) {
        store.dispatch(SetCategoryList(responseData.Rows));
        store.dispatch(SetCategoryListTotal(responseData.Total[0].count));
        return true;
      } else {
        store.dispatch(SetCategoryList([]));
        store.dispatch(SetCategoryListTotal(0));
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

export async function CreateUpdateCategoryRequest(
  PostBody: ICategory,
  ObjectId: string | null,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string;
  let res;
  try {
    if (ObjectId === null) {
      // Create new expense
      URL = `${BaseURL}/create-category`;
      res = await axios.post(URL, PostBody, AxiosHeader);
    } else {
      // Update existing expense
      URL = `${BaseURL}/update-category/${ObjectId}`;
      res = await axios.put(URL, PostBody, AxiosHeader);
    }

    if (
      (res.status === 200 || res.status === 201) &&
      res.data?.status === 'success'
    ) {
      SuccessToast('Request Success');
      store.dispatch(ResetCategoryFormValue());
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
export async function FillCategoryFormRequest(ObjectId: string): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/category-details-by-id/${ObjectId}`;

  try {
    const res = await axios.get(URL, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      const responseData = res.data?.data[0];
      store.dispatch(
        OnChangeCategoryInput({ name: 'name', value: responseData?.name }),
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
export async function DeleteCategoryRequest(ObjectId: string): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/delete-category/${ObjectId}`;

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