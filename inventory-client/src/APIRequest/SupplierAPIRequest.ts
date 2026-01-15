import axios from 'axios';
import { AxiosHeader, BaseURL } from '../helper/config';
import { ErrorToast, SuccessToast } from '../helper/formHelper';
import { HideLoader, ShowLoader } from '../redux/state_slice/settingsSlice';
import { SetSupplierList, SetSupplierListTotal } from '../redux/state_slice/supplierSlice';
import { store } from '../redux/store/store';

export async function GetSupplierListRequest(
  pageNo: string | number,
  perPage: string | number,
  SearchKeyword: string
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
