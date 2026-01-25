import axios from "axios";
import { AxiosHeader, BaseURL } from "../helper/config";
import { HideLoader, ShowLoader } from "../redux/state_slice/settingsSlice";
import { store } from "../redux/store/store";
import { ErrorToast } from "../helper/formHelper";
import { SetExpenseSummaryList, SetPurchaseSummaryList, SetRetrunSummaryList, SetSalesSummaryList } from "../redux/state_slice/summarySlice";

export async function ExpenseSummaryRequest(): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/expenses-summary`;
  try {
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(SetExpenseSummaryList(res.data?.data));
    return true;
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}
export async function SalesSummaryRequest(): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/sales-summary`;
  try {
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(SetSalesSummaryList(res.data?.data));
    return true;
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}
export async function ReturnSummaryRequest(): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/return-summary`;
  try {
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(SetRetrunSummaryList(res.data?.data));
    return true;
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}
export async function PurchaseSummaryRequest(): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/purchases-summary`;
  try {
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(SetPurchaseSummaryList(res.data?.data));
    return true;
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}
