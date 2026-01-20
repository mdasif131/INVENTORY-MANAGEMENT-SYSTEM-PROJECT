import axios from 'axios';
import { AxiosHeader, BaseURL } from '../helper/config';
import { ErrorToast, SuccessToast } from '../helper/formHelper';
import {
  OnChangeProductInput,
  ResetProductFormValue,
  SetBrandDropDown,
  SetCategoryDropDown,
  SetProdcutList,
  SetProdcutListTotal,
  type IProduct,
} from '../redux/state_slice/productSlice';
import { HideLoader, ShowLoader } from '../redux/state_slice/settingsSlice';
import { store } from '../redux/store/store';

export async function GetProductListRequest(
  pageNo: string | number,
  perPage: string | number,
  SearchKeyword: string,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/product-list/${pageNo}/${perPage}/${SearchKeyword}`;

  try {
    const res = await axios.get(URL, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      const responseData = res.data?.data[0];

      if (responseData?.Rows && responseData.Rows.length > 0) {
        store.dispatch(SetProdcutList(responseData.Rows));
        store.dispatch(SetProdcutListTotal(responseData.Total[0].count));
        return true;
      } else {
        store.dispatch(SetProdcutList([]));
        store.dispatch(SetProdcutListTotal(0));
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

export async function BrandDropDownRequest(): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/brandDropDown`;
  try {
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(SetBrandDropDown(res.data?.data));
    return true;
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}
export async function CategoryDropDownRequest(): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/categoryDropDown`;
  try {
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(SetCategoryDropDown(res.data?.data));
    return true;
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}

export async function CreateUpdateProductRequest(
  PostBody: IProduct,
  ObjectId: string | null,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string;
  let res;
  try {
    if (ObjectId === null) {
      // Create new expense
      URL = `${BaseURL}/create-product`;
      res = await axios.post(URL, PostBody, AxiosHeader);
    } else {
      // Update existing expense
      URL = `${BaseURL}/update-product/${ObjectId}`;
      res = await axios.put(URL, PostBody, AxiosHeader);
    }

    if (
      (res.status === 200 || res.status === 201) &&
      res.data?.status === 'success'
    ) {
      SuccessToast('Request Success');
      store.dispatch(ResetProductFormValue());
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

export async function FillProuctFormRequest(
  ObjectId: string,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/products-details-by-id/${ObjectId}`;

  try {
    const res = await axios.get(URL, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      const responseData = res.data?.data[0];
      store.dispatch(
        OnChangeProductInput({ name: 'name', value: responseData?.name }),
      );
      store.dispatch(
        OnChangeProductInput({ name: 'unit', value: responseData?.unit }),
      );
      store.dispatch(
        OnChangeProductInput({ name: 'brandID', value: responseData?.brandID }),
      );
      store.dispatch(
        OnChangeProductInput({ name: 'categoryID', value: responseData?.categoryID }),
      );
      store.dispatch(
        OnChangeProductInput({ name: 'details', value: responseData?.details }),
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
export async function DeleteProductRequest(ObjectId: string): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/delete-product/${ObjectId}`;

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