import toast from 'react-hot-toast';

let EmailRegex = /^\S+@\S+\.\S+$/;
let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
class FormHelper {
  IsEmpty(value: string): boolean {
    return value.length === 0;
  }
  IsMobile(value: string): boolean {
    return MobileRegx.test(value);
  }

  IsEmail(value: string): boolean {
    return !EmailRegex.test(value);
  }
  ErrorToast(msg: string): void {
    toast.error(msg, { position: 'top-center' });
  } 

  SuccessToast(msg: string): void{
    toast.success(msg, {position:"top-center"})
  }

  // getBase64(file: File): Promise<string | ArrayBuffer | null>{
    // return new Promise((resolve, reject) => {
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload=()=>resolve(reader.result);
      // reader.onerror=(error)=>reject(error);
    // })
  // }
}
export const { IsEmpty, IsMobile, IsEmail, ErrorToast, SuccessToast } =
  new FormHelper(); 

  // In formHelper.ts
export const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};