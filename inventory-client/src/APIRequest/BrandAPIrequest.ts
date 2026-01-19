import axios from 'axios';
import { store } from '../redux/store/store';
import { HideLoader, ShowLoader } from '../redux/state_slice/settingsSlice';
import { ErrorToast, SuccessToast } from '../helper/formHelper';
import { AxiosHeader, BaseURL } from '../helper/config';
import {
  SetBrandList,
  SetBrandListTotal,
} from '../redux/state_slice/brandSlice';

export async function GetBrandListRequest(
  pageNo:  number,
  perPage: string |number,
  SearchKeyword: string
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
