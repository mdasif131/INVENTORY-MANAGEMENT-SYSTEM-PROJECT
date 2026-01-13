import type { IUser } from "./types";

class SessionHelper {
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  setUserInfo(data: IUser) {
    localStorage.setItem('UserInfo', JSON.stringify(data));
  }
  getUerInfo(): IUser | null {
    let info = localStorage.getItem('UserInfo');
    if (info) {
      return JSON.parse(info) as IUser;
    }
    return null;
  }
  removeSession(): void {
    localStorage.clear();
    window.location.href = '/login';
  }

  setEamil(email: string) {
    localStorage.setItem('recoverEmail', email);
  }
  getEmail(): string | null {
    return localStorage.getItem('recoverEmail');
  }

  setOTP(otp: string) {
    localStorage.setItem('OTP', otp);
  }
  getOTP(): string | null {
    return localStorage.getItem('OTP');
  }
} 
export const { setToken, getToken, setUserInfo, getUerInfo, removeSession ,setEamil, getEmail, setOTP, getOTP} =
  new SessionHelper();