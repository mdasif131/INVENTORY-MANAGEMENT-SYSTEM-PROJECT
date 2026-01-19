import axios from 'axios';
import { AxiosHeader, BaseURL } from '../helper/config';
import { ErrorToast, SuccessToast } from '../helper/formHelper';
import {
  OnChangeCustomerInput,
  ResetFormValue,
  SetCustomerList,
  SetCustomerListTotal,
  type ICustomer,
} from '../redux/state_slice/customerSlice';
import { HideLoader, ShowLoader } from '../redux/state_slice/settingsSlice';
import { store } from '../redux/store/store';

export async function GetCustomerListRequest(
  pageNo: string | number,
  perPage: string | number,
  SearchKeyword: string,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/customer-list/${pageNo}/${perPage}/${SearchKeyword}`;

  try {
    const res = await axios.get(URL, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      const responseData = res.data?.data[0];

      if (responseData?.Rows && responseData.Rows.length > 0) {
        store.dispatch(SetCustomerList(responseData.Rows));
        store.dispatch(SetCustomerListTotal(responseData.Total[0].count));
        return true;
      } else {
        store.dispatch(SetCustomerList([]));
        store.dispatch(SetCustomerListTotal(0));
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
export async function CreateUpdateCustomerRequest(
  PostBody: ICustomer,
  ObjectId: string | null,
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string;
  let res;
  try {
    if (ObjectId === null) {
      // Create new customer
      URL = `${BaseURL}/create-customer`;
      res = await axios.post(URL, PostBody, AxiosHeader);
    } else {
      // Update existing customer
      URL = `${BaseURL}/update-customer/${ObjectId}`;
      res = await axios.put(URL, PostBody, AxiosHeader);
    }

    if (
      (res.status === 200 || res.status === 201) &&
      res.data?.status === 'success'
    ) {
      SuccessToast('Request Success');
      store.dispatch(ResetFormValue())
      return true;
    } else {
      if (res.data?.error?.keyPattern?.phone === 1) {
        ErrorToast('Mobile Number Already Exist');
        return false;
      }
      return false
    }
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}

export async function FillCustomerFormRequest(
 ObjectId:string
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/customer-details-by-id/${ObjectId}`;

  try {
    const res = await axios.get(URL, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
      const responseData = res.data?.data[0];
       store.dispatch(OnChangeCustomerInput({Name:"customerName", value:responseData?.customerName}))
       store.dispatch(OnChangeCustomerInput({Name:"phone", value:responseData?.phone}))
       store.dispatch(OnChangeCustomerInput({Name:"email", value:responseData?.email}))
      store.dispatch(OnChangeCustomerInput({ Name: "address", value: responseData?.address }))
      return true
    } else {
      ErrorToast('Something went wrong');
      return false
    }
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}
export async function DeleteCustomerRequest(
 ObjectId:string
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/delete-customer/${ObjectId}`;

  try {
    const res = await axios.delete(URL, AxiosHeader);

    if (res.status === 200 && res.data?.status === 'success') {
     SuccessToast('Request Success');
      return true
    } else if (res.status === 409 && res.data?.status === "Associate") {
      
      ErrorToast(res.data?.message as string || "Can not delete");
      return false
    }
    else {
      ErrorToast('Something went wrong');
      return false
    }
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}