export interface RegistrationRequestBody {
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  password: string;
  photo: string;
}
export interface IUserDetails {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  password?: string;
  photo: string;
}
export interface LoginRequestBody {
  email: string;
  password: string;
}
export interface CreateTaskRequestBody {
  title: string;
  description: string;
  status?: string;
}
export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'New' | 'Completed' | 'Progress' | 'Canceled';
  createDate?: string;
  // Add other fields from your API response
}
export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  photo: string;
  password?: string; // Only present in creation, not in responses
  createDate?: string;
  id?: string; // Some APIs duplicate _id as id
}
export interface IResetPassBody {
  email: string | null;
  otp: string | null;
  password: string;
}
