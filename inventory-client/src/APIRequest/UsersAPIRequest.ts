import axios from 'axios';
import { AxiosHeader, BaseURL } from '../helper/config';
import { ErrorToast, SuccessToast } from '../helper/formHelper';
import {
  getUerInfo,
  setEamil,
  setOTP,
  setToken,
  setUserInfo
} from '../helper/sessionHelper';
import type { IResetPassBody, IUserDetails, LoginRequestBody, RegistrationRequestBody } from '../helper/types';
import { SetProfile } from '../redux/state_slice/profileSlice';
import { HideLoader, ShowLoader } from '../redux/state_slice/settingsSlice';
import { store } from '../redux/store/store';


export async function LoginRequest(
  email: string,
  password: string
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = BaseURL + '/login';
  let PostBody: LoginRequestBody = { email: email, password: password };
  try {
    const res = await axios.post(URL, PostBody);
    store.dispatch(HideLoader());
    if (res.status === 200 && res.data?.status === 'success') {
      setToken(res.data?.token);
      setUserInfo(res.data?.data);
      SuccessToast('Login Success');
      return true;
    } else {
      ErrorToast(res.data.message || 'Something went wrong');
      return false;
    }
  } catch (error: any) {
    store.dispatch(HideLoader());
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  }
}
export async function RegistrationRequest(
  email: string,
  firstName: string,
  lastName: string,
  mobile: string,
  password: string,
  photo: string
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = BaseURL + '/registration';
  let PostBody: RegistrationRequestBody = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    password: password,
    photo: photo,
  };
  try {
    const res = await axios.post(URL, PostBody);
    store.dispatch(HideLoader());
    if (res.status === 201 && res.data?.status === 'success') {
      SuccessToast('Registration Success');
      return true;
    } else {
      ErrorToast(res.data.message || 'Something went wrong');
      return false;
    }
  } catch (error: any) {
    store.dispatch(HideLoader());
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  }
}



export async function GetProfileDetails(): Promise<boolean> {
  store.dispatch(ShowLoader());
  const URL: string = `${BaseURL}/profile-details`;
  try {
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(SetProfile(res.data?.data));
    return true;
  } catch (error: any) {
    ErrorToast(error?.response?.data?.data || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}

export async function ProfileUpdateRequest(
  email: string,
  firstName: string,
  lastName: string,
  mobile: string,
  password: string,
  photo: string
) {
  store.dispatch(ShowLoader());
  const URL: string = `${BaseURL}/profile-update`;
  const PostBody: RegistrationRequestBody = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    password: password,
    photo: photo,
  };

  const currentProfile = getUerInfo();
  const userId = currentProfile?._id;

  if (!userId) {
    ErrorToast('User ID not found');
    store.dispatch(HideLoader());
    return false;
  }
  let UserDetails: IUserDetails = {
    _id: userId,
    email: email,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    photo: photo,
  };

  try {
    const res = await axios.put(URL, PostBody, AxiosHeader);
    if (res.status === 200) {
      setUserInfo(UserDetails);
      SuccessToast('Profile Updated Successfully');
      return true;
    }
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}

// Recover Verify Email Request Step -01
export async function RecoverVerifyEmailRequest(
  email: string
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/recover-verify-email/${email}`;
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      setEamil(email);
      SuccessToast('A 6 Digit OTP sent to your email address');
    }
    return true;
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}
// Recover Verify Email Request Step -02
export async function RecoverVerifyOTPRequest(
  email: string | null,
  otp: string
): Promise<boolean> {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/recover-verify-otp/${email}/${otp}`;
  try {
    await axios.get(URL);
    setOTP(otp);
    SuccessToast('OTP Verify Success');
    return true;
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}
// Recover Verify Email Request Step -03
export async function RecoverResetPassRequest(
  email: string | null,
  otp: string | null,
  password: string
) {
  store.dispatch(ShowLoader());
  let URL: string = `${BaseURL}/recover-reset-password`;
  let PostBody: IResetPassBody = { email: email, otp: otp, password: password };
  try {
    await axios.post(URL, PostBody);

    SuccessToast('Reset Password Successfully');
    return true;
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || 'Something went wrong');
    return false;
  } finally {
    store.dispatch(HideLoader());
  }
}
