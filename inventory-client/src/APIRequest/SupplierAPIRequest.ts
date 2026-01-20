import axios from 'axios';
import { AxiosHeader, BaseURL } from '../helper/config';
import { ErrorToast, SuccessToast } from '../helper/formHelper';
import { HideLoader, ShowLoader } from '../redux/state_slice/settingsSlice';
import {
  OnChangeSupplerInput,
  ResetSupplerFormValue,
  SetSupplierList,
  SetSupplierListTotal,
  type ISupplier,
} from '../redux/state_slice/supplierSlice';
import { store } from '../redux/store/store';

export async function GetSupplierListRequest(
  pageNo: string | number,
  perPage: string | number,
  SearchKeyword: string,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/supplier-list/${pageNo}/${perPage}/${SearchKeyword}`;

  try {
    const res = await axios.get(URL, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      const responseData = res.data?.data[0];

      if (responseData?.Rows && responseData.Rows.length > 0) {
        store.dispatch(SetSupplierList(responseData.Rows));
        store.dispatch(SetSupplierListTotal(responseData.Total[0].count));
        SuccessToast('Supplier list loaded successfully');
        return true;
      } else {
        store.dispatch(SetSupplierList([]));
        store.dispatch(SetSupplierListTotal(0));
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

export async function CreateUpdateSupplierRequest(
  PostBody: ISupplier,
  ObjectId: string | null,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string;
  let res;
  try {
    if (ObjectId === null) {
      // Create new customer
      URL = `${BaseURL}/create-supplier`;
      res = await axios.post(URL, PostBody, AxiosHeader);
    } else {
      // Update existing customer
      URL = `${BaseURL}/update-supplier/${ObjectId}`;
      res = await axios.put(URL, PostBody, AxiosHeader);
    }

    if (
      (res.status === 200 || res.status === 201) &&
      res.data?.status === 'success'
    ) {
      SuccessToast('Request Success');
      store.dispatch(ResetSupplerFormValue());
      return true;
    } else {
      if (res.data?.error?.keyPattern?.phone === 1) {
        ErrorToast('Mobile Number Already Exist');
        return false;
      }
      return false;
    }
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}

export async function FillSupplierFormRequest(
  ObjectId: string,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/supplier-details-by-id/${ObjectId}`;

  try {
    const res = await axios.get(URL, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      const responseData = res.data?.data[0];
      store.dispatch(
        OnChangeSupplerInput({
          Name: 'name',
          value: responseData?.name,
        }),
      );
      store.dispatch(
        OnChangeSupplerInput({ Name: 'phone', value: responseData?.phone }),
      );
      store.dispatch(
        OnChangeSupplerInput({ Name: 'email', value: responseData?.email }),
      );
      store.dispatch(
        OnChangeSupplerInput({
          Name: 'address',
          value: responseData?.address,
        }),
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
export async function DeleteSupplierRequest(
  ObjectId: string,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/delete-supplier/${ObjectId}`;

  try {
    const res = await axios.delete(URL, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      SuccessToast('Request Success');
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